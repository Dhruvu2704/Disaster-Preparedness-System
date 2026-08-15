from sqlalchemy import Column, Integer, String, Boolean
from app.database.session import Base


class PreparednessChecklist(Base):
    __tablename__ = "preparedness_checklist"

    id = Column(Integer, primary_key=True, index=True)

    disaster_type = Column(
        "category",
        String(50),
        nullable=False
    )

    item = Column(
        "item_name",
        String(150),
        nullable=False
    )

    required = Column(
        "required",
        Boolean,
        nullable=False
    )