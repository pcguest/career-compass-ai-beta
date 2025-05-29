from typing import Any, List, Optional, Union
from pydantic import AnyHttpUrl, PostgresDsn, field_validator
from pydantic_settings import BaseSettings
import secrets


class Settings(BaseSettings):
    """
    Application settings and configuration.
    
    This class manages all configuration settings for the application, including:
    - Basic application settings
    - External service credentials
    - Security configurations
    - Database and caching settings
    - API rate limiting
    - AI model configurations
    """
    
    # Application Settings
    APP_NAME: str = "CareerCompassAI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    
    # Security Settings
    SECRET_KEY: str = secrets.token_urlsafe(32)
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS Settings
    CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:5173",  # Frontend development server
        "http://localhost:4173",  # Frontend preview server
    ]
    
    # Database Settings
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    DATABASE_URI: Optional[PostgresDsn] = None
    
    # Supabase Settings
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_JWT_SECRET: str
    
    # Redis Settings
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: Optional[str] = None
    REDIS_DB: int = 0
    CACHE_TTL: int = 3600  # 1 hour in seconds
    
    # OpenAI Settings
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4-1106-preview"
    OPENAI_TIMEOUT: int = 30
    OPENAI_MAX_RETRIES: int = 3
    
    # Anthropic Settings
    ANTHROPIC_API_KEY: str
    ANTHROPIC_MODEL: str = "claude-2.1"
    ANTHROPIC_TIMEOUT: int = 30
    ANTHROPIC_MAX_RETRIES: int = 3
    
    # Rate Limiting Settings
    RATE_LIMIT_WINDOW: int = 3600  # 1 hour in seconds
    RATE_LIMIT_MAX_REQUESTS: int = 100
    RATE_LIMIT_STRATEGY: str = "fixed-window"
    
    # AI Analysis Settings
    MAX_RESUME_LENGTH: int = 10000  # characters
    MAX_JOB_DESC_LENGTH: int = 5000  # characters
    ANALYSIS_TIMEOUT: int = 60  # seconds
    SIMILARITY_THRESHOLD: float = 0.75
    
    @field_validator("DATABASE_URI", mode="before")
    def assemble_db_connection(cls, v: Optional[str], values: dict) -> Any:
        """Constructs database URI from components or returns existing URI."""
        if isinstance(v, str):
            return v
        
        return PostgresDsn.build(
            scheme="postgresql",
            username=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )
    
    @field_validator("CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        """Processes CORS origins from string or list input."""
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create global settings instance
settings = Settings()