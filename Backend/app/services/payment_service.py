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

from app.constants.booking_constants import BookingStatus

from app.repositories.payment_repository import (
    create_payment,
    get_payment_by_reservation,
    get_payment_history,
)

from app.schemas.payment_schema import PaymentCreate


# ==========================================================
# Make Payment
# ==========================================================

def make_payment(
    request: PaymentCreate,
    db: Session,
):

    # ======================================================
    # Get Reservation
    # ======================================================

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
            detail=(
                f"Reservation with ID "
                f"{request.reservation_id} not found."
            ),
        )

    # ======================================================
    # Validate Booking Status
    # ======================================================

    if booking.status == BookingStatus.CANCELLED:
        raise HTTPException(
            status_code=400,
            detail=(
                "Cannot make payment for a cancelled booking."
            ),
        )

    if booking.status == BookingStatus.EXPIRED:
        raise HTTPException(
            status_code=409,
            detail=(
                "This booking has expired because the room "
                "was booked by another customer."
            ),
        )

    if booking.status == BookingStatus.BOOKED:
        raise HTTPException(
            status_code=400,
            detail="Booking is already confirmed.",
        )

    # ======================================================
    # Check Duplicate Payment
    # ======================================================

    existing_payment = get_payment_by_reservation(
        request.reservation_id,
        db,
    )

    if existing_payment:
        raise HTTPException(
            status_code=400,
            detail="Payment already completed.",
        )

    # ======================================================
    # Final Availability Check Before Payment
    # ======================================================

    conflicting_booking = (
        db.query(Reservation)
        .filter(
            Reservation.id != booking.id,
            Reservation.room_id == booking.room_id,
            Reservation.status == BookingStatus.BOOKED,
            Reservation.check_in < booking.check_out,
            Reservation.check_out > booking.check_in,
        )
        .first()
    )

    if conflicting_booking:

        booking.status = BookingStatus.EXPIRED

        db.commit()
        db.refresh(booking)

        raise HTTPException(
            status_code=409,
            detail=(
                "This room is no longer available for the "
                "selected dates. Your booking has expired."
            ),
        )

    # ======================================================
    # Create Successful Payment
    # ======================================================

    payment = Payment(
        reservation_id=request.reservation_id,
        amount=booking.total_price,
        payment_method=request.payment_method,
        payment_status="SUCCESS",
        transaction_id=str(uuid.uuid4()),
    )

    payment = create_payment(
        payment,
        db,
    )

    # ======================================================
    # Confirm Current Booking
    # ======================================================

    booking.status = BookingStatus.BOOKED

    # ======================================================
    # Expire Other Conflicting Pending Bookings
    # ======================================================

    conflicting_pending_bookings = (
        db.query(Reservation)
        .filter(
            Reservation.id != booking.id,
            Reservation.room_id == booking.room_id,
            Reservation.status == BookingStatus.PENDING,
            Reservation.check_in < booking.check_out,
            Reservation.check_out > booking.check_in,
        )
        .all()
    )

    for pending_booking in conflicting_pending_bookings:
        pending_booking.status = BookingStatus.EXPIRED

    db.commit()
    db.refresh(booking)

    return payment


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
            detail="Payment not found.",
        )

    return payment


# ==========================================================
# Get All Payments - Admin
# ==========================================================

def get_all_payments(db: Session):

    records = get_payment_history(db)

    payments = []

    for payment, reservation in records:

        payments.append({
            "id": payment.id,
            "reservation_id": payment.reservation_id,
            "customer_name": reservation.customer_name,
            "room_id": reservation.room_id,
            "check_in": reservation.check_in,
            "check_out": reservation.check_out,
            "amount": payment.amount,
            "payment_method": payment.payment_method,
            "payment_status": payment.payment_status,
            "transaction_id": payment.transaction_id,
            "created_at": payment.created_at,
        })

    return payments