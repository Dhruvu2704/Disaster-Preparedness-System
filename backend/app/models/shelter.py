from sqlalchemy import Column, Integer, String, Float
from app.database.session import Base

class Shelter(Base):
    __tablename__ = "shelters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    capacity = Column(Integer)
    status = Column(String(50))
    district = Column(String(100))