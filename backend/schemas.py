import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, EmailStr, Field

# --- Auth & User Schemas ---
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    plan: str
    credits_remaining: int
    is_active: bool
    avatar: Optional[str] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    plan: Optional[str] = None
    is_active: Optional[bool] = None
    credits_to_add: Optional[int] = None
    password: Optional[str] = None

# --- API Key Schemas ---
class ApiKeyCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    permissions: str = "all"
    rate_limit: int = 60
    usage_limit: int = 100000

class ApiKeyResponse(BaseModel):
    id: str
    name: str
    masked_key: str
    raw_key: Optional[str] = None  # Only returned on creation
    status: str
    permissions: str
    rate_limit: int
    usage_limit: int
    current_usage: int
    last_used_at: Optional[datetime.datetime] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# --- AI Service Schemas ---
class ChatMessage(BaseModel):
    role: str  # 'system', 'user', 'assistant'
    content: str

class ChatRequest(BaseModel):
    model: str = "gpt-4o"
    messages: List[ChatMessage]
    temperature: float = 0.7
    max_tokens: int = 1024
    stream: bool = False

class CodeGenerateRequest(BaseModel):
    language: str = "typescript"
    prompt: str
    model: str = "gpt-4o"
    temperature: float = 0.2

class ImageGenerateRequest(BaseModel):
    prompt: str
    model: str = "dall-e-3"
    size: str = "1024x1024"
    style: str = "vivid"  # 'vivid', 'natural', 'anime', '3d'
    quality: str = "hd"

class AIResponse(BaseModel):
    id: str
    model: str
    content: str
    tokens_used: int
    latency_ms: int
    finish_reason: str = "stop"
    created_at: str

class ImageResponse(BaseModel):
    id: str
    model: str
    prompt: str
    image_url: str
    size: str
    created_at: str

class ModelInfo(BaseModel):
    id: str
    name: str
    provider: str
    category: str
    context_window: str
    latency: str
    cost_per_1k: float
    description: str
    badge: Optional[str] = None

class TemplateResponse(BaseModel):
    id: str
    title: str
    category: str
    description: str
    prompt: str
    tags: List[str]
    icon: str

    class Config:
        from_attributes = True

# --- Analytics & Admin Schemas ---
class StatCard(BaseModel):
    title: str
    value: Any
    change: float
    change_label: str
    is_currency: bool = False
    accent_color: str

class AdminDashboardStats(BaseModel):
    total_users: int
    active_keys: int
    total_api_calls: int
    monthly_revenue: float
    avg_latency_ms: int
    error_rate: float
    chart_data: List[Dict[str, Any]]
    recent_activity: List[Dict[str, Any]]
    active_models: List[Dict[str, Any]]

class SystemHealth(BaseModel):
    status: str
    database: str
    ai_engine: str
    active_connections: int
    uptime_seconds: float
    cpu_load_pct: float
    memory_usage_pct: float
    version: str

class SystemSettingUpdate(BaseModel):
    key: str
    value: str
    description: Optional[str] = None
