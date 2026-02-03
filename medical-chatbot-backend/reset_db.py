from database.db import engine, Base
from models.chat_history import ChatHistory
from sqlalchemy import text

def reset_chat_table():
    print("Attempting to drop and recreate chat_history table...")
    try:
        # Drop table
        with engine.connect() as conn:
            conn.execute(text("DROP TABLE IF EXISTS chat_history"))
            conn.commit()
        print("Table dropped successfully.")
        
        # Recreate table
        Base.metadata.create_all(bind=engine, tables=[ChatHistory.__table__])
        print("Table recreated successfully with Correct IDENTITY Property.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    reset_chat_table()
