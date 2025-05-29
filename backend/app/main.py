from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from typing import Dict, Any
import time
import uuid

from .core.config import settings
from .core.logger import configure_logging, get_logger, log_request_middleware
from .services.ai.ai_evaluator import JobEvaluator, JobEvaluationRequest, JobEvaluationResponse
from .db.session import SessionLocal

# Configure logging
configure_logging()
logger = get_logger(__name__)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handles application startup and shutdown events."""
    # Startup
    logger.info("Starting up CareerCompassAI API")
    try:
        # Initialize database connection
        async with SessionLocal() as db:
            await db.execute("SELECT 1")
        logger.info("Database connection established")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down CareerCompassAI API")

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered career guidance and job application evaluation platform",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add rate limiter error handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.middleware("http")
async def request_middleware(request: Request, call_next):
    """Middleware for request logging and timing."""
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Add request context to logger
    logger.bind(**log_request_middleware(request_id))
    
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        
        logger.info(
            "request_processed",
            path=request.url.path,
            method=request.method,
            status_code=response.status_code,
            duration=f"{process_time:.3f}s"
        )
        
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time"] = str(process_time)
        return response
        
    except Exception as e:
        logger.error(
            "request_failed",
            path=request.url.path,
            method=request.method,
            error=str(e)
        )
        raise

@app.exception_handler(ValueError)
async def validation_exception_handler(request: Request, exc: ValueError):
    """Handles validation errors."""
    return JSONResponse(
        status_code=400,
        content={
            "error": "Validation Error",
            "detail": str(exc)
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handles general exceptions."""
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "detail": "An unexpected error occurred"
        }
    )

@app.get("/")
async def root() -> Dict[str, Any]:
    """Root endpoint with API information."""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "description": "AI-powered career guidance platform",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """Health check endpoint."""
    try:
        # Check database connection
        async with SessionLocal() as db:
            await db.execute("SELECT 1")
        
        return {
            "status": "healthy",
            "timestamp": time.time(),
            "services": {
                "api": "up",
                "database": "up"
            }
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "timestamp": time.time(),
                "error": str(e)
            }
        )

@app.post(
    "/api/v1/evaluate",
    response_model=JobEvaluationResponse,
    description="Evaluate job fit using AI analysis"
)
@limiter.limit(f"{settings.RATE_LIMIT_MAX_REQUESTS}/hour")
async def evaluate_job(
    request: JobEvaluationRequest,
    req: Request = Depends()
) -> JobEvaluationResponse:
    """
    Evaluates job fit using AI analysis.
    
    Args:
        request: Job evaluation request containing job description and background
        req: FastAPI request object for rate limiting
        
    Returns:
        Detailed job evaluation response
        
    Raises:
        HTTPException: For rate limiting or processing errors
    """
    try:
        evaluator = JobEvaluator()
        result = await evaluator.evaluate_job(request)
        
        # Save evaluation to database asynchronously
        # This would be implemented in a real application
        
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Evaluation failed: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to process evaluation request"
        )

@app.get(
    "/api/v1/evaluations/{evaluation_id}",
    response_model=JobEvaluationResponse,
    description="Retrieve a specific evaluation"
)
async def get_evaluation(evaluation_id: str) -> JobEvaluationResponse:
    """
    Retrieves a specific job evaluation by ID.
    
    Args:
        evaluation_id: Unique identifier for the evaluation
        
    Returns:
        The requested job evaluation
        
    Raises:
        HTTPException: If evaluation is not found
    """
    try:
        # This would fetch the evaluation from the database
        # For now, we'll raise a not implemented error
        raise NotImplementedError("Evaluation retrieval not yet implemented")
    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=f"Evaluation {evaluation_id} not found"
        )