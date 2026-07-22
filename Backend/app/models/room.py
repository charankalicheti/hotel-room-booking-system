"""
=========================================================
Room Model
Hotel Room Booking System
=========================================================
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
)

from sqlalchemy.sql import func

from app.database import Base


class Room(Base):
    __tablename__ = "room"

<<<<<<< Updated upstream
    # ==========================================================
    # Primary Key
    # ==========================================================

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ==========================================================
    # Basic Details
    # ==========================================================

    room_number = Column(
        String(20),
        unique=True,
        nullable=False,
    )

    room_type = Column(
        String(50),
        nullable=False,
    )

    floor_number = Column(
        Integer,
        nullable=False,
        default=1,
    )

    # ==========================================================
    # Capacity
    # ==========================================================

    capacity = Column(
        Integer,
        nullable=False,
    )

    bed_type = Column(
        String(50),
        nullable=False,
        default="Queen",
    )

    # ==========================================================
    # Pricing
    # ==========================================================

    price = Column(
        Float,
        nullable=False,
    )

    # ==========================================================
    # Amenities
    # ==========================================================

    ac = Column(
        Boolean,
        default=True,
    )

    wifi = Column(
        Boolean,
        default=True,
    )

    tv = Column(
        Boolean,
        default=True,
    )

    breakfast_included = Column(
        Boolean,
        default=False,
    )

    # ==========================================================
    # Description
    # ==========================================================

    description = Column(
        String(500),
        nullable=True,
    )

    image_url = Column(
        String(500),
        nullable=True,
    )

    # ==========================================================
    # Rating
    # ==========================================================

    rating = Column(
        Float,
        default=4.5,
    )

    # ==========================================================
    # Availability
    # ==========================================================

    is_available = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    # ==========================================================
    # Audit
    # ==========================================================

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
=======
    id = Column(Integer, primary_key=True, index=True)
    room_number = Column(String(50), unique=True, nullable=False)
    room_type = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    capacity = Column(Integer, nullable=False)
    description = Column(String(255), nullable=True)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
>>>>>>> Stashed changes
