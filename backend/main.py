from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .seed import seed_database
from .routers import auth, users, api_keys, ai, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-seed database on server start
    print(f"[App] Starting {settings.PROJECT_NAME} v{settings.PROJECT_VERSION}...")
    seed_database()
    yield
    print(f"[App] Shutting down {settings.PROJECT_NAME}...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="High-Performance Multi-Modal AI SaaS Backend API with JWT Auth, SQLite/Postgres ORM, and Streaming Inference.",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(users.router, prefix=settings.API_PREFIX)
app.include_router(api_keys.router, prefix=settings.API_PREFIX)
app.include_router(ai.router, prefix=settings.API_PREFIX)
app.include_router(admin.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "status": "online",
        "name": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "documentation": "/docs",
        "endpoints": {
            "auth": f"{settings.API_PREFIX}/auth",
            "user": f"{settings.API_PREFIX}/user",
            "keys": f"{settings.API_PREFIX}/keys",
            "ai": f"{settings.API_PREFIX}/ai",
            "admin": f"{settings.API_PREFIX}/admin",
        }
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION
    }
