from dotenv import load_dotenv
import os

load_dotenv()

from database.db import engine, Base
from models.user import User
from models.chat_history import ChatHistory
from models.knowledge import Knowledge

# Create tables
Base.metadata.create_all(bind=engine)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router
from routes.chat import router as chat_router
from routes.train import router as train_router

app = FastAPI(title="Advanced Medical Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:8000", "http://localhost:8001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Medical Chatbot API Running"}

# Include routes
app.include_router(user_router, prefix="/api/auth", tags=["Auth"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(train_router, prefix="/api/train", tags=["Training"])
