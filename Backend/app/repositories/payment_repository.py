"""
=========================================================
Payment Repository
Hotel Room Booking System
=========================================================
"""

from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.reservation import Reservation

# ==========================================================
# Create Payment
# ==========================================================

def create_payment(
    payment: Payment,
    db: Session,
) -> Payment:

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment


# ==========================================================
# Get Payment By Reservation
# ==========================================================

def get_payment_by_reservation(
    reservation_id: int,
    db: Session,
) -> Payment | None:

    return (
        db.query(Payment)
        .filter(Payment.reservation_id == reservation_id)
        .first()
    )


# ==========================================================
# Get Payment By Id
# ==========================================================

def get_payment_by_id(
    payment_id: int,
    db: Session,
) -> Payment | None:

    return (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .first()
    )


# ==========================================================
# Payment History
# ==========================================================

def get_payment_history(db: Session):
    return (
        db.query(Payment, Reservation)
        .join(
            Reservation,
            Payment.reservation_id == Reservation.id
        )
        .order_by(Payment.created_at.desc())
        .all()
    )
    

   