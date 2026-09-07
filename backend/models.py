import datetime
import uuid
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(50), default="user", nullable=False)  # 'user' or 'admin'
    plan = Column(String(50), default="pro", nullable=False)   # 'starter', 'pro', 'enterprise'
    credits_remaining = Column(Integer, default=50000)
    is_active = Column(Boolean, default=True)
    avatar = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    api_keys = relationship("ApiKey", back_populates="user", cascade="all, delete-orphan")
    generations = relationship("Generation", back_populates="user", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")

class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    key_hash = Column(String(255), unique=True, nullable=False)
    prefix = Column(String(20), nullable=False)  # e.g., sk_live_abc1...
    masked_key = Column(String(50), nullable=False)  # sk_live_••••••••9f4a
    status = Column(String(50), default="active")   # 'active' or 'revoked'
    permissions = Column(String(100), default="all") # 'all', 'read_only', 'write_only'
    rate_limit = Column(Integer, default=60)        # req/min
    usage_limit = Column(Integer, default=100000)
    current_usage = Column(Integer, default=0)
    last_used_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="api_keys")

class Generation(Base):
    __tablename__ = "generations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    model = Column(String(100), nullable=False)
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    tokens_used = Column(Integer, default=0)
    cost = Column(Float, default=0.0)
    type = Column(String(50), default="chat")  # 'chat', 'code', 'image'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="generations")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    invoice_id = Column(String(100), unique=True, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String(50), default="Paid")  # 'Paid', 'Pending', 'Refunded'
    plan = Column(String(100), default="Pro Plan")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="transactions")

class PromptTemplate(Base):
    __tablename__ = "prompt_templates"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # 'Engineering', 'Marketing', 'Content', 'Data', 'Design'
    description = Column(Text, nullable=False)
    prompt = Column(Text, nullable=False)
    tags = Column(String(255), default="")
    icon = Column(String(50), default="Sparkles")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SystemSetting(Base):
    __tablename__ = "system_settings"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=False)
    description = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
