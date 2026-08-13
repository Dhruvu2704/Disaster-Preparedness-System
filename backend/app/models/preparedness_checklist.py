from sqlalchemy import Column, Integer, String, Text
from app.database.session import Base

class PreparednessChecklist(Base):
    __tablename__ = "preparedness_checklist"

    id = Column(Integer, primary_key=True, index=True)
    disaster_type = Column(String(100), nullable=False)
    item = Column(Text, nullable=False)
    priority = Column(Integer, default=1)