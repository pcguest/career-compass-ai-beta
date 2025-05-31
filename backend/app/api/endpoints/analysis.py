
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import Dict, Any
from ...db.session import get_db
from ...services.ai.analysis_service import AnalysisService
from pydantic import BaseModel

router = APIRouter()

class JobApplicationModel(BaseModel):
    resume_text: str
    job_description: str = ""

class ResumeAnalysisModel(BaseModel):
    resume_text: str

@router.post("/analyze-job-application")
async def analyze_job_application(
    job_data: JobApplicationModel,
    db: Session = Depends(get_db),
    request: Request
) -> Dict[str, Any]:
    """
    Receives a job application payload, analyzes it, and returns a score/feedback.
    """
    if not job_data.resume_text:
        raise HTTPException(status_code=400, detail="Resume text is required.")

    analysis_service = AnalysisService()
    
    try:
        if job_data.job_description:
            # Analyze job match if job description is provided
            result = await analysis_service.analyze_job_match(
                job_data.resume_text, 
                job_data.job_description
            )
        else:
            # Just analyze the resume
            result = await analysis_service.analyze_resume(job_data.resume_text)
        
        if not result.get("success", True):
            raise HTTPException(status_code=500, detail=result.get("message", "Analysis failed"))
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/analyze-resume")
async def analyze_resume(
    resume_data: ResumeAnalysisModel,
    db: Session = Depends(get_db),
    request: Request
) -> Dict[str, Any]:
    """
    Analyze just the resume without job description comparison.
    """
    if not resume_data.resume_text:
        raise HTTPException(status_code=400, detail="Resume text is required.")

    analysis_service = AnalysisService()
    
    try:
        result = await analysis_service.analyze_resume(resume_data.resume_text)
        
        if not result.get("success", True):
            raise HTTPException(status_code=500, detail=result.get("message", "Analysis failed"))
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume analysis failed: {str(e)}")

@router.post("/generate-interview-questions")
async def generate_interview_questions(
    job_data: JobApplicationModel,
    db: Session = Depends(get_db),
    request: Request
) -> Dict[str, Any]:
    """
    Generate interview questions based on resume and job description.
    """
    if not job_data.resume_text:
        raise HTTPException(status_code=400, detail="Resume text is required.")
    
    if not job_data.job_description:
        raise HTTPException(status_code=400, detail="Job description is required for interview question generation.")

    analysis_service = AnalysisService()
    
    try:
        result = await analysis_service.generate_interview_questions(
            job_data.resume_text, 
            job_data.job_description
        )
        
        if not result.get("success", True):
            raise HTTPException(status_code=500, detail=result.get("message", "Question generation failed"))
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Interview question generation failed: {str(e)}")
