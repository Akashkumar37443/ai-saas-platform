import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI SaaS Platform"
    PROJECT_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Security
    SECRET_KEY: str = "super-secret-key-change-in-production-ai-saas-platform-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    # Default to SQLite for zero-config out-of-the-box operation; can be switched to PostgreSQL in .env
    DATABASE_URL: str = "sqlite:///./saas_platform.db"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # AI API Keys (Optional - built-in smart mock engine works out-of-the-box if left blank)
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    
    # Platform Defaults
    DEFAULT_USER_CREDITS: int = 50000
    DEFAULT_RATE_LIMIT_PER_MINUTE: int = 60

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
