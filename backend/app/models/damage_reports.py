from sqlalchemy import Column, Integer, String, Text, Float
from app.database.session import Base


class DamageReport(Base):
    __tablename__ = "damage_reports"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        nullable=True
    )

    type = Column(
        String(50),
        nullable=False
    )

    description = Column(Text)

    photo = Column(Text)

    latitude = Column(
        Float,
        nullable=False
    )

    longitude = Column(
        Float,
        nullable=False
    )

    severity = Column(String(30))

    status = Column(
        String(30),
        default="Reported"
    )