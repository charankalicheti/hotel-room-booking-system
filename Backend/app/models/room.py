from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True, index=True)
    room_number = Column(String(50), unique=True, nullable=False)
    room_type = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    capacity = Column(Integer, nullable=False)
    description = Column(String(255), nullable=True)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())3