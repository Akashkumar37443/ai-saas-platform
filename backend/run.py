import os
import sys
import uvicorn

# Ensure the parent directory is in sys.path so "backend.main" or "main" resolves cleanly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print("==================================================")
    print("   AI SaaS Platform - FastAPI Backend Server      ")
    print(f"   API Docs:    http://localhost:{port}/docs      ")
    print(f"   API Health:  http://localhost:{port}/api/health")
    print("==================================================")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
