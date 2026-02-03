from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.user import User
from utils.security import hash_password, verify_password, create_access_token
from pydantic import BaseModel

router = APIRouter()

# Pydantic Schemas
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# Register
@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        new_user = User(
            name=user.name,
            email=user.email,
            password_hash=hash_password(user.password)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        token = create_access_token(new_user.id)
        return {"message": "User registered", "user_id": new_user.id, "token": token}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Register Error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# Login
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        print(f"DEBUG: Login attempt for email: '{user.email}'")
        db_user = db.query(User).filter(User.email == user.email).first()
        
        if not db_user:
            print(f"DEBUG: User not found in DB for email: '{user.email}'")
            raise HTTPException(status_code=400, detail="Invalid credentials")
            
        print(f"DEBUG: User found: {db_user.email}, Hashed Password in DB: {db_user.password_hash[:20]}...")
        
        is_valid = verify_password(user.password, db_user.password_hash)
        print(f"DEBUG: Password verification outcome: {is_valid}")
        
        if not is_valid:
            print("DEBUG: Password mismatch")
            raise HTTPException(status_code=400, detail="Invalid credentials")

        token = create_access_token(db_user.id)
        return {"message": "Login successful", "token": token}
    except HTTPException:
        raise
    except Exception as e:
        print(f"DEBUG: Unexpected Login Error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
