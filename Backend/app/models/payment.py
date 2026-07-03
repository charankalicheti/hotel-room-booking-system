"""
=========================================================
Payment Model
Hotel Room Booking System
=========================================================
"""

from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey,
)

from sqlalchemy.sql import func

from app.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    reservation_id = Column(
        Integer,
        ForeignKey("reservations.id"),
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    payment_method = Column(
        String(50),
        nullable=False
    )

    payment_status = Column(
        String(20),
        default="SUCCESS",
        nullable=False
    )

    transaction_id = Column(
        String(100),
        unique=True,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )