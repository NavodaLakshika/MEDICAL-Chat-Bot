from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.chat_history import ChatHistory
from utils.security import get_current_user
from services.gemini_service import ask_gemini

from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/send")
def chat(chat_req: ChatRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        message = chat_req.message
        print(f"Chat Request from user {current_user.id}: {message}")
        
        # 1. Fetch recent history for this user to provide "Memory"
        past_chats = db.query(ChatHistory).filter(ChatHistory.user_id == current_user.id).order_by(ChatHistory.timestamp.desc()).limit(10).all()
        
        # 2. Format history for Gemini (reverse to get chronological order)
        history = []
        for chat_item in reversed(past_chats):
            history.append({"role": "user", "parts": [chat_item.message]})
            history.append({"role": "model", "parts": [chat_item.response]})

        # 3. Fetch Knowledge Base ("Training" Data)
        from models.knowledge import Knowledge
        knowledge_base = db.query(Knowledge).all()
        knowledge_context = "\n".join([f"TITLE: {k.title}\nCONTENT: {k.content}" for k in knowledge_base])

        # 4. Get response with memory and training
        response = ask_gemini(message, history=history, custom_knowledge=knowledge_context)
        print(f"Gemini Response: {response[:100]}...")

        chat_record = ChatHistory(
            user_id=current_user.id,
            message=message,
            response=response
        )
        db.add(chat_record)
        db.commit()
        db.refresh(chat_record)
        print(f"Chat recorded with ID: {chat_record.id}")

        return {
            "message": message,
            "response": response,
            "timestamp": chat_record.timestamp
        }
    except Exception as e:
        print(f"CRITICAL CHAT ERROR: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
def get_history(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    chats = db.query(ChatHistory).filter(ChatHistory.user_id == current_user.id).order_by(ChatHistory.timestamp.desc()).all()
    return [{"message": c.message, "response": c.response, "timestamp": c.timestamp} for c in chats]
