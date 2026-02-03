from sqlalchemy import Column, Integer, Text, String, DateTime
from database.db import Base
import datetime

class Knowledge(Base):
    __tablename__ = "knowledge_base"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(100), default="General")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
