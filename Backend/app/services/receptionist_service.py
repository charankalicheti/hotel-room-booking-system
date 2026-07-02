"""
=========================================================
Receptionist Service
Hotel Room Booking System
=========================================================
"""

from sqlalchemy.orm import Session

from app.repositories.booking_repository import (
    get_booking_by_id,
)

from app.exceptions.booking_exceptions import (
    BookingNotFoundException,
)


# ==========================================================
# Check In
# ==========================================================

def customer_check_in(
    booking_id: int,
    db: Session,
):

    booking = get_booking_by_id(
        booking_id,
        db,
    )

    if not booking:
        raise BookingNotFoundException()

    return {
        "message": "Customer checked in successfully.",
        "booking_id": booking.id,
        "customer_name": booking.customer_name,
        "room_id": booking.room_id,
    }


# ==========================================================
# Check Out
# ==========================================================

def customer_check_out(
    booking_id: int,
    db: Session,
):

    booking = get_booking_by_id(
        booking_id,
        db,
    )

    if not booking:
        raise BookingNotFoundException()

    return {
        "message": "Customer checked out successfully.",
        "booking_id": booking.id,
        "customer_name": booking.customer_name,
        "room_id": booking.room_id,
    }