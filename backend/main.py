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

# Configure CORS to permit local network requests from frontend port 3000
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.6:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
