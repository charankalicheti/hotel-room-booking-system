"""
=========================================================
Payment Service
Hotel Room Booking System
=========================================================
"""

import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.reservation import Reservation

from app.repositories.payment_repository import (
    create_payment,
    get_payment_by_reservation,
)

from app.schemas.payment_schema import PaymentCreate


# ==========================================================
# Make Payment
# ==========================================================

def make_payment(
    request: PaymentCreate,
    db: Session,
):

    booking = (
        db.query(Reservation)
        .filter(
            Reservation.id == request.reservation_id
        )
        .first()
    )

    if booking is None:
        raise HTTPException(
            status_code=404,
            detail=f"Reservation with ID {request.reservation_id} not found."
        )

    existing_payment = get_payment_by_reservation(
        request.reservation_id,
        db,
    )

    if existing_payment:
        raise HTTPException(
            status_code=400,
            detail="Payment already completed."
        )

    payment = Payment(
        reservation_id=request.reservation_id,
        amount=booking.total_price,
        payment_method=request.payment_method,
        payment_status="SUCCESS",
        transaction_id=str(uuid.uuid4()),
    )

    return create_payment(
        payment,
        db,
    )


# ==========================================================
# Get Payment
# ==========================================================

def get_payment(
    reservation_id: int,
    db: Session,
):

    payment = get_payment_by_reservation(
        reservation_id,
        db,
    )

    if payment is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found."
        )

    return payment