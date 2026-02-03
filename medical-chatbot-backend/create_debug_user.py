from database.db import SessionLocal
from models.user import User
from utils.security import hash_password

db = SessionLocal()
email = "debug@example.com"
password = "password123"

existing = db.query(User).filter(User.email == email).first()
if not existing:
    new_user = User(
        name="Debug User",
        email=email,
        password_hash=hash_password(password)
    )
    db.add(new_user)
    db.commit()
    print(f"Created user: {email} / {password}")
else:
    existing.password_hash = hash_password(password)
    db.commit()
    print(f"Updated user password: {email} / {password}")
db.close()
