from datetime import datetime
import hashlib
import json
from typing import List, Optional, Dict, Any
import redis
from pydantic import BaseModel, Field, validator
from tenacity import retry, stop_after_attempt, wait_exponential
import openai
import anthropic
from ...core.config import settings
from ...core.logger import get_logger

logger = get_logger(__name__)

class JobEvaluationRequest(BaseModel):
    """Request model for job evaluation."""
    job_description: str = Field(..., min_length=50, max_length=settings.MAX_JOB_DESC_LENGTH)
    your_background: str = Field(..., min_length=50, max_length=settings.MAX_RESUME_LENGTH)
    ai_provider: str = Field(default="openai", pattern="^(openai|anthropic)$")

    @validator("job_description", "your_background")
    def validate_text_length(cls, v: str) -> str:
        """Validates text length and removes excessive whitespace."""
        return " ".join(v.split())

class JobEvaluationResponse(BaseModel):
    """Response model for job evaluation results."""
    score: float = Field(..., ge=0, le=100)
    summary: str
    strengths: List[str]
    gaps: List[str]
    suggested_questions: List[str]
    career_advice: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CacheManager:
    """Manages caching of job evaluations using Redis."""
    
    def __init__(self):
        """Initializes Redis connection with fallback to dummy cache."""
        try:
            self.redis = redis.Redis(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                password=settings.REDIS_PASSWORD,
                db=settings.REDIS_DB,
                decode_responses=True
            )
            self.redis.ping()
            self.cache_available = True
        except redis.ConnectionError:
            logger.warning("Redis connection failed, using in-memory cache fallback")
            self.cache_available = False
            self._memory_cache = {}

    def generate_cache_key(self, request: JobEvaluationRequest) -> str:
        """Generates a unique cache key for the evaluation request."""
        content = f"{request.job_description}:{request.your_background}:{request.ai_provider}"
        return f"job_eval:{hashlib.sha256(content.encode()).hexdigest()}"

    def get_cached_response(self, key: str) -> Optional[JobEvaluationResponse]:
        """Retrieves cached evaluation response."""
        try:
            if self.cache_available:
                data = self.redis.get(key)
            else:
                data = self._memory_cache.get(key)
            
            if data:
                return JobEvaluationResponse(**json.loads(data))
        except Exception as e:
            logger.error(f"Cache retrieval error: {e}")
        return None

    def cache_response(self, key: str, response: JobEvaluationResponse) -> None:
        """Caches evaluation response with TTL."""
        try:
            data = response.model_dump_json()
            if self.cache_available:
                self.redis.setex(key, settings.CACHE_TTL, data)
            else:
                self._memory_cache[key] = data
        except Exception as e:
            logger.error(f"Cache storage error: {e}")

class JobEvaluator:
    """Handles job evaluation using AI providers."""
    
    def __init__(self):
        """Initializes AI clients and cache manager."""
        self.cache = CacheManager()
        self.openai_client = openai.Client(api_key=settings.OPENAI_API_KEY)
        self.anthropic_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    def _create_evaluation_prompt(self, job_description: str, background: str) -> str:
        """Creates a comprehensive prompt for AI evaluation."""
        return f"""Analyze the job fit between the candidate's background and the job description. 
        Provide a detailed evaluation with the following components:

        1. Overall match score (0-100) based on:
           - Skills match (40% weight)
           - Experience relevance (30% weight)
           - Education/qualifications (20% weight)
           - Cultural fit indicators (10% weight)

        2. Summary of the analysis
        3. Key strengths and alignment points
        4. Identified gaps and areas for growth
        5. Relevant behavioral interview questions
        6. Career development advice

        Job Description:
        {job_description}

        Candidate Background:
        {background}

        Provide the analysis in JSON format with the following structure:
        {
            "score": float,
            "summary": string,
            "strengths": string[],
            "gaps": string[],
            "suggested_questions": string[],
            "career_advice": string
        }"""

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    async def _call_openai(self, prompt: str) -> Dict[str, Any]:
        """Makes API call to OpenAI with retry logic."""
        try:
            response = await self.openai_client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    async def _call_anthropic(self, prompt: str) -> Dict[str, Any]:
        """Makes API call to Anthropic with retry logic."""
        try:
            response = await self.anthropic_client.messages.create(
                model=settings.ANTHROPIC_MODEL,
                max_tokens=1000,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )
            return json.loads(response.content[0].text)
        except Exception as e:
            logger.error(f"Anthropic API error: {e}")
            raise

    async def evaluate_job(self, request: JobEvaluationRequest) -> JobEvaluationResponse:
        """
        Evaluates job fit using specified AI provider with caching.
        
        Args:
            request: JobEvaluationRequest containing job details and preferences
            
        Returns:
            JobEvaluationResponse with detailed analysis and recommendations
            
        Raises:
            ValueError: If the AI provider is invalid
            Exception: For API or processing errors
        """
        try:
            # Check cache first
            cache_key = self.cache.generate_cache_key(request)
            cached_response = self.cache.get_cached_response(cache_key)
            if cached_response:
                logger.info("Returning cached evaluation")
                return cached_response

            # Create evaluation prompt
            prompt = self._create_evaluation_prompt(
                request.job_description,
                request.your_background
            )

            # Call appropriate AI provider
            if request.ai_provider == "openai":
                result = await self._call_openai(prompt)
            elif request.ai_provider == "anthropic":
                result = await self._call_anthropic(prompt)
            else:
                raise ValueError(f"Invalid AI provider: {request.ai_provider}")

            # Create and cache response
            response = JobEvaluationResponse(**result)
            self.cache.cache_response(cache_key, response)
            return response

        except Exception as e:
            logger.error(f"Job evaluation error: {e}")
            raise