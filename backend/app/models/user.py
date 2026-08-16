from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column("password_hash_hash",String(255), nullable=False)
    phone = Column(String(20))

    # New fields for RescueNet
    blood_group = Column(String(10))
    medical_conditions = Column(Text)
    address = Column(Text)
    city = Column(String(100))
    district = Column(String(100))

    created_at = Column(DateTime, default=datetime.utcnow)