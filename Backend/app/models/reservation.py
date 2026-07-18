"""
=========================================================
Reservation Model
=========================================================
"""

from sqlalchemy import (
    Column,
    Integer,
    Date,
    DateTime,
    ForeignKey,
    String,
    Float,
    Enum,
)
from sqlalchemy.sql import func

from app.database import Base
from app.constants.booking_constants import BookingStatus



class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    customer_name = Column(
        String(100),
        nullable=False,
    )

    room_id = Column(
        Integer,
        ForeignKey("room.id"),
        nullable=False
    )

    check_in = Column(
        Date,
        nullable=False
    )

    check_out = Column(
        Date,
        nullable=False
    )

    guests = Column(
        Integer,
        default=1,
        nullable=False
    )

    total_price = Column(
        Float,
        nullable=False
    )

    status = Column(
        Enum(BookingStatus),
        default=BookingStatus.PENDING_PAYMENT,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    # server_default ensures updated_at is set on INSERT too
    # onupdate keeps it refreshed on every UPDATE
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
