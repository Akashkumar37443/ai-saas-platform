import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Generation, PromptTemplate
from ..schemas import (
    ChatRequest, AIResponse, CodeGenerateRequest, ImageGenerateRequest,
    ImageResponse, ModelInfo, TemplateResponse
)
from ..auth import get_user_from_api_or_token, get_current_user
from ..services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI Engine"])

@router.get("/models", response_model=List[ModelInfo])
def list_models():
    """List all available flagship & fast AI models"""
    return AIService.get_models()

@router.post("/chat", response_model=AIResponse)
async def chat_completion(
    payload: ChatRequest,
    current_user: User = Depends(get_user_from_api_or_token),
    db: Session = Depends(get_db)
):
    if current_user.credits_remaining <= 0:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Credit limit exceeded. Please upgrade your subscription tier."
        )

    # Format messages for AI engine
    messages_dict = [{"role": m.role, "content": m.content} for m in payload.messages]
    
    result = await AIService.chat_completion(
        model=payload.model,
        messages=messages_dict,
        temperature=payload.temperature,
        max_tokens=payload.max_tokens
    )

    # Deduct credits & record generation
    tokens = result["tokens_used"]
    cost = tokens * 0.00002
    current_user.credits_remaining = max(0, current_user.credits_remaining - tokens)
    
    last_prompt = payload.messages[-1].content if payload.messages else "Chat"
    gen = Generation(
        user_id=current_user.id,
        model=payload.model,
        prompt=last_prompt,
        response=result["content"][:2000],
        tokens_used=tokens,
        cost=cost,
        type="chat"
    )
    db.add(gen)
    db.commit()

    return result

@router.post("/stream")
async def chat_stream_endpoint(
    payload: ChatRequest,
    current_user: User = Depends(get_user_from_api_or_token),
    db: Session = Depends(get_db)
):
    if current_user.credits_remaining <= 0:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Credit limit reached"
        )
    
    messages_dict = [{"role": m.role, "content": m.content} for m in payload.messages]
    
    # Decrement standard batch of credits
    current_user.credits_remaining = max(0, current_user.credits_remaining - 150)
    db.commit()

    return StreamingResponse(
        AIService.chat_stream(payload.model, messages_dict, payload.temperature),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

@router.post("/code")
async def generate_code_endpoint(
    payload: CodeGenerateRequest,
    current_user: User = Depends(get_user_from_api_or_token),
    db: Session = Depends(get_db)
):
    if current_user.credits_remaining <= 0:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits"
        )

    result = await AIService.generate_code(
        language=payload.language,
        prompt=payload.prompt,
        model=payload.model
    )

    tokens = result["tokens_used"]
    current_user.credits_remaining = max(0, current_user.credits_remaining - tokens)
    
    gen = Generation(
        user_id=current_user.id,
        model=payload.model,
        prompt=f"[{payload.language}] {payload.prompt}",
        response=result["code"][:2000],
        tokens_used=tokens,
        cost=tokens * 0.00003,
        type="code"
    )
    db.add(gen)
    db.commit()

    return result

@router.post("/image", response_model=ImageResponse)
async def generate_image_endpoint(
    payload: ImageGenerateRequest,
    current_user: User = Depends(get_user_from_api_or_token),
    db: Session = Depends(get_db)
):
    if current_user.credits_remaining < 500:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Image generation requires at least 500 credits"
        )

    result = await AIService.generate_image(
        prompt=payload.prompt,
        model=payload.model,
        size=payload.size,
        style=payload.style
    )

    current_user.credits_remaining = max(0, current_user.credits_remaining - 500)
    
    gen = Generation(
        user_id=current_user.id,
        model=payload.model,
        prompt=payload.prompt,
        response=result["image_url"],
        tokens_used=500,
        cost=0.04,
        type="image"
    )
    db.add(gen)
    db.commit()

    return result

@router.get("/templates")
def list_templates(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(PromptTemplate)
    if category and category != "All":
        query = query.filter(PromptTemplate.category == category)
    
    templates = query.all()
    
    return [
        {
            "id": t.id,
            "title": t.title,
            "category": t.category,
            "description": t.description,
            "prompt": t.prompt,
            "tags": [tag.strip() for tag in t.tags.split(",") if tag.strip()],
            "icon": t.icon
        }
        for t in templates
    ]
