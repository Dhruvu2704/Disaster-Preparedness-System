from sqlalchemy import Column, Integer, String, Text, Float
from app.database.session import Base


class MissingPerson(Base):
    __tablename__ = "missing_persons"

    id = Column(Integer, primary_key=True, index=True)

    reported_by = Column(
        Integer,
        nullable=True
    )

    name = Column(
        String(150),
        nullable=False
    )

    age = Column(Integer)

    gender = Column(String(20))

    photo = Column(Text)

    last_seen = Column(Text)

    latitude = Column(Float)

    longitude = Column(Float)

    status = Column(
        String(30),
        default="Missing"
    )