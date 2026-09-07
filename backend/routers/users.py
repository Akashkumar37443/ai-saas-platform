from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, ApiKey, Generation, Transaction
from ..schemas import UserResponse, UserUpdate
from ..auth import get_current_user, get_password_hash

router = APIRouter(prefix="/user", tags=["User Portal"])

@router.get("/profile", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=UserResponse)
def update_profile(payload: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if payload.name:
        current_user.name = payload.name.strip()
    if payload.email and payload.email != current_user.email:
        existing = db.query(User).filter(User.email == payload.email, User.id != current_user.id).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email is already used by another account")
        current_user.email = payload.email
    if payload.password:
        current_user.hashed_password = get_password_hash(payload.password)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/stats")
def get_user_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    total_keys = db.query(ApiKey).filter(ApiKey.user_id == current_user.id, ApiKey.status == "active").count()
    total_generations = db.query(Generation).filter(Generation.user_id == current_user.id).count()
    
    # Calculate total tokens consumed
    generations = db.query(Generation).filter(Generation.user_id == current_user.id).all()
    tokens_consumed = sum(g.tokens_used for g in generations)
    
    return {
        "plan": current_user.plan,
        "credits_remaining": current_user.credits_remaining,
        "credits_total": 50000 if current_user.plan == "pro" else 100000,
        "active_api_keys": total_keys,
        "total_requests": total_generations,
        "tokens_consumed": tokens_consumed,
        "plan_renewal_date": "2026-10-15"
    }

@router.get("/usage")
def get_user_usage(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Recent generations
    recent_gens = db.query(Generation).filter(
        Generation.user_id == current_user.id
    ).order_by(Generation.created_at.desc()).limit(10).all()
    
    chart_data = [
        {"date": "Mon", "tokens": 4200, "requests": 42},
        {"date": "Tue", "tokens": 7800, "requests": 76},
        {"date": "Wed", "tokens": 5100, "requests": 53},
        {"date": "Thu", "tokens": 9400, "requests": 89},
        {"date": "Fri", "tokens": 12100, "requests": 114},
        {"date": "Sat", "tokens": 8200, "requests": 67},
        {"date": "Sun", "tokens": 14500, "requests": 138},
    ]
    
    model_breakdown = [
        {"model": "GPT-4o", "percentage": 54, "tokens": 32800},
        {"model": "Claude 3.5 Sonnet", "percentage": 28, "tokens": 17200},
        {"model": "DALL-E 3", "percentage": 12, "tokens": 7400},
        {"model": "Llama 3.3", "percentage": 6, "tokens": 3900},
    ]
    
    return {
        "chart_data": chart_data,
        "model_breakdown": model_breakdown,
        "recent_generations": [
            {
                "id": g.id,
                "model": g.model,
                "prompt": g.prompt[:60] + ("..." if len(g.prompt) > 60 else ""),
                "tokens_used": g.tokens_used,
                "type": g.type,
                "created_at": g.created_at.isoformat()
            }
            for g in recent_gens
        ]
    }

@router.get("/invoices")
def get_user_invoices(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    transactions = db.query(Transaction).filter(Transaction.user_id == current_user.id).order_by(Transaction.created_at.desc()).all()
    if not transactions:
        # Provide sample default invoices for demo presentation
        return [
            {"id": "INV-2026-003", "date": "Sep 01, 2026", "amount": "$49.00", "status": "Paid", "plan": "Pro Plan"},
            {"id": "INV-2026-002", "date": "Aug 01, 2026", "amount": "$49.00", "status": "Paid", "plan": "Pro Plan"},
            {"id": "INV-2026-001", "date": "Jul 01, 2026", "amount": "$49.00", "status": "Paid", "plan": "Pro Plan"},
        ]
    return [
        {
            "id": t.invoice_id,
            "date": t.created_at.strftime("%b %d, %Y"),
            "amount": f"${t.amount:.2f}",
            "status": t.status,
            "plan": t.plan
        }
        for t in transactions
    ]
