import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database import engine
import models
from auth import router as auth_router

# Initialize database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Career Mentor - API Service",
    description="Production-grade authentication, career assessments, and user profile management backend.",
    version="1.0.0"
)

# Configure CORS to permit local network requests from any port during development
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers with prefix
app.include_router(auth_router, prefix="/api")

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "AI Career Mentor API",
        "database": engine.name
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
