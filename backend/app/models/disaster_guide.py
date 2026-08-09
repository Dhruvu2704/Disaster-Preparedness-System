from sqlalchemy import Column, Integer, String, Text
from app.database.session import Base


class DisasterGuide(Base):
    __tablename__ = "disaster_guides"

    id = Column(Integer, primary_key=True, index=True)
    disaster_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    before_text = Column(Text, nullable=False)
    during_text = Column(Text, nullable=False)
    after_text = Column(Text, nullable=False)