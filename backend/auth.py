import bcrypt
import os
import secrets
import hashlib
import datetime
from typing import Optional
from fastapi import Depends, HTTPException, status, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from .config import settings
from .database import get_db
from .models import User, ApiKey

security = HTTPBearer(auto_error=False)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8')[:72],
            hashed_password.encode('utf-8')
        )
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    pwd_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def generate_api_key(is_live: bool = True) -> tuple[str, str, str, str]:
    """Generates (raw_key, key_hash, prefix, masked_key)"""
    prefix = "sk_live_" if is_live else "sk_test_"
    random_part = secrets.token_hex(16)
    raw_key = f"{prefix}{random_part}"
    key_hash = hashlib.sha256(raw_key.encode()).hexdigest()
    masked_key = f"{prefix}{'•' * 8}{random_part[-4:]}"
    return raw_key, key_hash, prefix, masked_key

def hash_api_key(raw_key: str) -> str:
    return hashlib.sha256(raw_key.strip().encode()).hexdigest()

def get_current_user(
    auth: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not auth:
        raise credentials_exception
    
    token = auth.credentials
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account is deactivated")
    
    return user

def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user

def get_user_from_api_or_token(
    x_api_key: Optional[str] = Header(None, alias="X-API-Key"),
    auth: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    # 1. Check API Key header
    if x_api_key:
        key_hash = hash_api_key(x_api_key)
        api_key = db.query(ApiKey).filter(ApiKey.key_hash == key_hash, ApiKey.status == "active").first()
        if not api_key:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or revoked API Key")
        
        # Update usage and last_used
        api_key.current_usage += 1
        api_key.last_used_at = datetime.datetime.utcnow()
        db.commit()
        
        user = db.query(User).filter(User.id == api_key.user_id).first()
        if not user or not user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User associated with API key is invalid")
        return user
    
    # 2. Check Bearer Token
    if auth:
        return get_current_user(auth, db)
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Missing authentication credentials (Provide 'Authorization: Bearer <token>' or 'X-API-Key: <key>')"
    )
