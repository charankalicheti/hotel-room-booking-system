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

    # ======================================================
    # Primary Key
    # ======================================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ======================================================
    # Reservation
    # ======================================================

    reservation_id = Column(
        Integer,
        ForeignKey("reservations.id"),
        nullable=False,
        index=True
    )

    # ======================================================
    # Customer
    # ======================================================

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False,
        index=True
    )

    # ======================================================
    # Payment Amount
    # ======================================================

    amount = Column(
        Float,
        nullable=False
    )

    discount = Column(
        Float,
        default=0.0,
        nullable=False
    )

    tax = Column(
        Float,
        default=0.0,
        nullable=False
    )

    total_amount = Column(
        Float,
        nullable=False
    )

    currency = Column(
        String(10),
        default="INR",
        nullable=False
    )

    # ======================================================
    # Payment Method
    # ======================================================

    payment_method = Column(
        String(50),
        nullable=False
    )

    gateway = Column(
        String(50),
        default="RAZORPAY",
        nullable=False
    )

    # ======================================================
    # Payment Status
    # ======================================================

    payment_status = Column(
        String(30),
        default="PENDING",
        nullable=False
    )

    # ======================================================
    # Gateway Details
    # ======================================================

    gateway_order_id = Column(
        String(200),
        unique=True,
        nullable=True
    )

    gateway_payment_id = Column(
        String(200),
        unique=True,
        nullable=True
    )

    gateway_signature = Column(
        String(500),
        nullable=True
    )

    # ======================================================
    # Transaction
    # ======================================================

    transaction_id = Column(
        String(200),
        unique=True,
        nullable=True
    )

    # ======================================================
    # Paid Time
    # ======================================================

    paid_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    # ======================================================
    # Created Time
    # ======================================================

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )