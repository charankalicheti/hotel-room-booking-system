"""
=========================================================
Receptionist Service
Hotel Room Booking System
=========================================================
"""

from sqlalchemy.orm import Session

from app.constants.booking_constants import BookingStatus

from app.repositories.booking_repository import (
    get_all_bookings,
    get_booking_by_id,
    update_booking,
)

from app.exceptions.booking_exceptions import (
    BookingNotFoundException,
)


# ==========================================================
# Get All Bookings
# ==========================================================

def get_all_reservations(
    db: Session,
):

    return get_all_bookings(db)


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

    if booking is None:
        raise BookingNotFoundException()

    booking.status = BookingStatus.CHECKED_IN

    update_booking(
        booking,
        db,
    )

    return {
        "success": True,
        "message": "Customer checked in successfully.",
        "booking_id": booking.id,
        "customer_name": booking.customer_name,
        "room_id": booking.room_id,
        "status": booking.status,
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

    if booking is None:
        raise BookingNotFoundException()

    booking.status = BookingStatus.CHECKED_OUT

    update_booking(
        booking,
        db,
    )

    return {
        "success": True,
        "message": "Customer checked out successfully.",
        "booking_id": booking.id,
        "customer_name": booking.customer_name,
        "room_id": booking.room_id,
        "status": booking.status,
    }