from typing import Dict, List, Any, Optional
import openai
from ...core.config import settings

class AnalysisService:
    """Service for AI-powered analysis of resumes and job descriptions."""
    
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
    
    async def analyze_resume(self, resume_text: str) -> Dict[str, Any]:
        """
        Analyze a resume and provide feedback and suggestions.
        
        Args:
            resume_text: The text content of the resume
            
        Returns:
            Dict containing analysis results
        """
        try:
            response = await openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert career advisor. Analyze this resume and provide detailed feedback."},
                    {"role": "user", "content": f"Please analyze this resume and provide feedback:\n\n{resume_text}"}
                ],
                temperature=0.5,
                max_tokens=1000
            )
            
            # Process the response to extract structured feedback
            analysis = self._process_resume_analysis(response.choices[0].message.content)
            return analysis
            
        except Exception as e:
            return {
                "error": str(e),
                "success": False,
                "message": "Failed to analyze resume"
            }
    
    async def analyze_job_match(self, resume_text: str, job_description: str) -> Dict[str, Any]:
        """
        Analyze how well a resume matches a job description.
        
        Args:
            resume_text: The text content of the resume
            job_description: The text content of the job description
            
        Returns:
            Dict containing match analysis and score
        """
        try:
            response = await openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert ATS system that evaluates resumes against job descriptions."},
                    {"role": "user", "content": f"Evaluate how well this resume matches the job description. Provide a match percentage and detailed feedback.\n\nRESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{job_description}"}
                ],
                temperature=0.5,
                max_tokens=1000
            )
            
            # Process the response to extract structured feedback
            analysis = self._process_job_match_analysis(response.choices[0].message.content)
            return analysis
            
        except Exception as e:
            return {
                "error": str(e),
                "success": False,
                "message": "Failed to analyze job match"
            }
    
    async def generate_interview_questions(self, resume_text: str, job_description: str) -> Dict[str, Any]:
        """
        Generate interview questions based on a resume and job description.
        
        Args:
            resume_text: The text content of the resume
            job_description: The text content of the job description
            
        Returns:
            Dict containing generated interview questions
        """
        try:
            response = await openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert interviewer who creates tailored interview questions."},
                    {"role": "user", "content": f"Generate 10 interview questions based on this resume and job description. Include both technical questions and behavioral questions.\n\nRESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{job_description}"}
                ],
                temperature=0.7,
                max_tokens=1000
            )
            
            # Extract questions from response
            questions = self._extract_interview_questions(response.choices[0].message.content)
            return {
                "success": True,
                "questions": questions
            }
            
        except Exception as e:
            return {
                "error": str(e),
                "success": False,
                "message": "Failed to generate interview questions"
            }
    
    def _process_resume_analysis(self, analysis_text: str) -> Dict[str, Any]:
        """Process raw analysis text into structured feedback."""
        # In a real implementation, this would parse the AI response into structured data
        # This is a simplified version
        return {
            "success": True,
            "analysis": analysis_text,
            "summary": "Analysis of your resume completed successfully.",
            # Additional structured fields would be extracted here
        }
    
    def _process_job_match_analysis(self, analysis_text: str) -> Dict[str, Any]:
        """Process job match analysis into structured data."""
        # In a real implementation, this would parse the AI response into structured data
        # This is a simplified version
        
        # Simulate extracting a match percentage (in reality would parse from the AI response)
        match_score = 75  # Example value
        
        return {
            "success": True,
            "analysis": analysis_text,
            "match_score": match_score,
            "summary": f"Your resume matches {match_score}% of the job requirements.",
            # Additional structured fields would be extracted here
        }
    
    def _extract_interview_questions(self, response_text: str) -> List[Dict[str, str]]:
        """Extract interview questions from response text."""
        # In a real implementation, this would parse the AI response to extract questions
        # This is a simplified version
        
        # Split the text by numbered questions (1., 2., etc.)
        lines = response_text.split('\n')
        questions = []
        current_question = ""
        
        for line in lines:
            # Check if this line starts a new question
            if line.strip() and line[0].isdigit() and '.' in line[:3]:
                # If we already have a question in progress, save it
                if current_question:
                    questions.append({"question": current_question.strip()})
                # Start a new question
                current_question = line
            else:
                # Continue the current question
                current_question += "\n" + line
        
        # Add the last question
        if current_question:
            questions.append({"question": current_question.strip()})
        
        return questions