from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database.db import get_db
from models.knowledge import Knowledge
from utils.security import get_current_user
import datetime

router = APIRouter()

@router.post("/upload-text")
def upload_text(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form("General"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # Only "Train" if user is authenticated (could add admin check later)
    try:
        new_knowledge = Knowledge(
            title=title,
            content=content,
            category=category,
            timestamp=datetime.datetime.utcnow()
        )
        db.add(new_knowledge)
        db.commit()
        db.refresh(new_knowledge)
        
        return {
            "status": "success",
            "message": f"Successfully 'trained' on {title}",
            "knowledge_id": new_knowledge.id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
def list_knowledge(db: Session = Depends(get_db)):
    knowledge_items = db.query(Knowledge).all()
    return knowledge_items
