from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

# SQL Server connection
DB_USER = "sa"
DB_PASSWORD = "softvinz@123"  # Password contains @
DB_HOST = "localhost"          # Default SQL Server
DB_NAME = "medical_chatbot"

# URL-encode the password
encoded_password = quote_plus(DB_PASSWORD)

# Connection string
DATABASE_URL = f"mssql+pyodbc://{DB_USER}:{encoded_password}@{DB_HOST}/{DB_NAME}?driver=ODBC+Driver+17+for+SQL+Server"

# Create engine and session
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative base for models
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
