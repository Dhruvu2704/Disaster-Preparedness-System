from sqlalchemy import Column, Integer, Float, Boolean, String, ForeignKey

from app.database.session import Base


class HelpRequest(Base):
    __tablename__ = "help_requests"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    food = Column(Boolean, default=False)
    medicine = Column(Boolean, default=False)
    water = Column(Boolean, default=False)
    shelter = Column(Boolean, default=False)

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    priority = Column(String(20), default="Medium")

    status = Column(String(30), default="Pending")