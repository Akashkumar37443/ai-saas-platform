from typing import List
import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, ApiKey
from ..schemas import ApiKeyCreate, ApiKeyResponse
from ..auth import get_current_user, generate_api_key, hash_api_key

router = APIRouter(prefix="/keys", tags=["API Keys"])

@router.get("", response_model=List[ApiKeyResponse])
def list_api_keys(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    keys = db.query(ApiKey).filter(ApiKey.user_id == current_user.id).order_by(ApiKey.created_at.desc()).all()
    return keys

@router.post("", response_model=ApiKeyResponse, status_code=status.HTTP_201_CREATED)
def create_api_key(payload: ApiKeyCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    raw_key, key_hash, prefix, masked_key = generate_api_key(is_live=True)
    
    new_key = ApiKey(
        user_id=current_user.id,
        name=payload.name.strip(),
        key_hash=key_hash,
        prefix=prefix,
        masked_key=masked_key,
        status="active",
        permissions=payload.permissions,
        rate_limit=payload.rate_limit,
        usage_limit=payload.usage_limit,
        current_usage=0
    )
    
    db.add(new_key)
    db.commit()
    db.refresh(new_key)
    
    # Return response including the raw key so the user can copy it once
    resp = ApiKeyResponse.from_orm(new_key)
    resp.raw_key = raw_key
    return resp

@router.post("/{key_id}/revoke", response_model=ApiKeyResponse)
def revoke_api_key(key_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    key = db.query(ApiKey).filter(ApiKey.id == key_id, ApiKey.user_id == current_user.id).first()
    if not key:
        raise HTTPException(status_code=404, detail="API Key not found")
    
    key.status = "revoked"
    db.commit()
    db.refresh(key)
    return key

@router.delete("/{key_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_api_key(key_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    key = db.query(ApiKey).filter(ApiKey.id == key_id, ApiKey.user_id == current_user.id).first()
    if not key:
        raise HTTPException(status_code=404, detail="API Key not found")
    
    db.delete(key)
    db.commit()
    return None

@router.post("/validate")
def validate_key(raw_key: str, db: Session = Depends(get_db)):
    key_hash = hash_api_key(raw_key)
    key = db.query(ApiKey).filter(ApiKey.key_hash == key_hash, ApiKey.status == "active").first()
    if not key:
        return {"valid": False, "message": "Invalid or revoked key"}
    return {
        "valid": True,
        "name": key.name,
        "permissions": key.permissions,
        "rate_limit": key.rate_limit,
        "usage_limit": key.usage_limit,
        "current_usage": key.current_usage
    }
