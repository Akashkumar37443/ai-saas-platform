import datetime
from .database import SessionLocal, engine, Base
from .models import User, ApiKey, PromptTemplate, Transaction, SystemSetting
from .auth import get_password_hash, generate_api_key

def seed_database():
    # Create all tables if not exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 1. Check if admin exists
        admin = db.query(User).filter(User.email == "admin@example.com").first()
        if not admin:
            admin = User(
                name="Platform Admin",
                email="admin@example.com",
                hashed_password=get_password_hash("admin123"),
                role="admin",
                plan="enterprise",
                credits_remaining=1000000,
                is_active=True
            )
            db.add(admin)
            print("[Seed] Created default admin: admin@example.com / admin123")

        # 2. Check if demo user exists
        user = db.query(User).filter(User.email == "user@example.com").first()
        if not user:
            user = User(
                name="Alex Mercer",
                email="user@example.com",
                hashed_password=get_password_hash("user123"),
                role="user",
                plan="pro",
                credits_remaining=48500,
                is_active=True
            )
            db.add(user)
            db.flush()

            # Seed API keys for demo user
            raw_k1, hash_k1, p1, m1 = generate_api_key(is_live=True)
            k1 = ApiKey(
                user_id=user.id,
                name="Production Web App",
                key_hash=hash_k1,
                prefix=p1,
                masked_key=m1,
                status="active",
                permissions="all",
                rate_limit=120,
                usage_limit=100000,
                current_usage=45230,
                last_used_at=datetime.datetime.utcnow() - datetime.timedelta(minutes=15)
            )
            raw_k2, hash_k2, p2, m2 = generate_api_key(is_live=False)
            k2 = ApiKey(
                user_id=user.id,
                name="Staging Testing Key",
                key_hash=hash_k2,
                prefix=p2,
                masked_key=m2,
                status="active",
                permissions="read_only",
                rate_limit=60,
                usage_limit=50000,
                current_usage=1240,
                last_used_at=datetime.datetime.utcnow() - datetime.timedelta(hours=2)
            )
            db.add_all([k1, k2])
            print("[Seed] Created default user: user@example.com / user123 + API Keys")

        # 3. Seed additional users for realistic admin table
        sample_users = [
            ("Sarah Connor", "sarah@cyberdyne.io", "pro", 72000, "user", True),
            ("David Bowman", "david@discovery.space", "starter", 18500, "user", True),
            ("Elena Rostova", "elena@novatech.com", "enterprise", 250000, "user", True),
            ("Marcus Vance", "marcus@vancecorp.ai", "pro", 34000, "user", False),
        ]
        for name, email, plan, credits, role, active in sample_users:
            if not db.query(User).filter(User.email == email).first():
                u = User(
                    name=name,
                    email=email,
                    hashed_password=get_password_hash("password123"),
                    role=role,
                    plan=plan,
                    credits_remaining=credits,
                    is_active=active
                )
                db.add(u)

        # 4. Seed prompt templates
        templates_data = [
            {
                "title": "React Streaming Hook",
                "category": "Engineering",
                "description": "Generate a modern TypeScript custom hook for SSE real-time streaming with abort controls.",
                "prompt": "Create a robust React 18 TypeScript hook called useAIStream that connects to an SSE endpoint and handles chunk buffering.",
                "tags": "React, TypeScript, SSE, Hooks",
                "icon": "Code"
            },
            {
                "title": "FastAPI Async CRUD Generator",
                "category": "Engineering",
                "description": "Scaffold asynchronous REST API endpoints with Pydantic v2 schemas and SQLAlchemy 2.0 ORM.",
                "prompt": "Generate a complete FastAPI router with async CRUD operations, Pydantic response models, and database dependencies.",
                "tags": "Python, FastAPI, SQLAlchemy, REST",
                "icon": "Terminal"
            },
            {
                "title": "High-Converting SaaS Landing Copy",
                "category": "Marketing",
                "description": "Write persuasive hero headlines, value props, and conversion-optimized CTA copy.",
                "prompt": "Draft an attention-grabbing hero headline, sub-headline, and 3 bullet points for a B2B AI productivity SaaS.",
                "tags": "Copywriting, Landing Page, SaaS, SEO",
                "icon": "Sparkles"
            },
            {
                "title": "SQL Analytical Query Optimizer",
                "category": "Data",
                "description": "Transform slow relational queries into index-optimized, partition-aware CTEs.",
                "prompt": "Analyze and optimize this PostgreSQL query for calculating 30-day user retention and cohort churn.",
                "tags": "SQL, PostgreSQL, Analytics, Performance",
                "icon": "Database"
            },
            {
                "title": "Photorealistic AI Character Art",
                "category": "Design",
                "description": "Generate photorealistic cinematic portraits with volumetric lighting and 8k detail.",
                "prompt": "A futuristic cyborg software engineer sitting in a neon-lit cyber workspace, cinematic 8k, photorealistic, octane render.",
                "tags": "DALL-E 3, Midjourney, Concept Art",
                "icon": "Image"
            },
            {
                "title": "Customer Support Response Synthesizer",
                "category": "Support",
                "description": "Draft empathetic, clear, and resolution-focused technical support replies.",
                "prompt": "Write a courteous and helpful email reply explaining how to troubleshoot API rate limit 429 errors.",
                "tags": "Support, Email, Customer Success",
                "icon": "MessageSquare"
            }
        ]
        
        for t in templates_data:
            if not db.query(PromptTemplate).filter(PromptTemplate.title == t["title"]).first():
                new_tpl = PromptTemplate(**t)
                db.add(new_tpl)

        # 5. Seed system settings
        default_settings = [
            ("app_name", "AI SaaS Platform", "Main branding application title"),
            ("support_email", "support@example.com", "Contact email for system notifications"),
            ("maintenance_mode", "false", "Global maintenance toggle")
        ]
        for k, v, desc in default_settings:
            if not db.query(SystemSetting).filter(SystemSetting.key == k).first():
                s = SystemSetting(key=k, value=v, description=desc)
                db.add(s)

        db.commit()
        print("[Seed] Seeding completed successfully.")
    except Exception as e:
        db.rollback()
        print(f"[Seed] Seeding error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
