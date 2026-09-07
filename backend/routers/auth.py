from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import UserRegister, UserLogin, TokenResponse, UserResponse
from ..auth import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    # Check if email exists
    existing = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email is already registered")
    
    hashed_pwd = get_password_hash(payload.password)
    new_user = User(
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        hashed_password=hashed_pwd,
        role="user",
        plan="pro",
        credits_remaining=50000
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.id, "email": new_user.email, "role": new_user.role})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "plan": new_user.plan,
            "credits_remaining": new_user.credits_remaining
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account has been suspended")
    
    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "plan": user.plan,
            "credits_remaining": user.credits_remaining
        }
    }

@router.post("/admin/login", response_model=TokenResponse)
def admin_login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin credentials")
    
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied: Admin role required")
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin account suspended")
    
    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "plan": user.plan,
            "credits_remaining": user.credits_remaining
        }
    }

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/demo-login/{account_type}", response_model=TokenResponse)
def demo_login(account_type: str, db: Session = Depends(get_db)):
    """Fast 1-click login for testing during Codester review / demo"""
    target_role = "admin" if account_type == "admin" else "user"
    user = db.query(User).filter(User.role == target_role, User.is_active == True).first()
    
    if not user:
        # Fallback create if not seeded
        pwd = get_password_hash("password123")
        user = User(
            name="Demo Admin" if target_role == "admin" else "Demo Developer",
            email="admin@example.com" if target_role == "admin" else "user@example.com",
            hashed_password=pwd,
            role=target_role,
            plan="enterprise" if target_role == "admin" else "pro",
            credits_remaining=100000
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "plan": user.plan,
            "credits_remaining": user.credits_remaining
        }
    }
