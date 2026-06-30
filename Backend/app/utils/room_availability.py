"""
=========================================================
Room Availability Utility
Hotel Room Booking System
=========================================================
"""

from datetime import date

from sqlalchemy.orm import Session

from app.models.room import Room
from app.models.reservation import Reservation
from app.constants.booking_constants import BookingStatus
from app.exceptions.booking_exceptions import InvalidBookingDateException


# ==========================================================
# Validate Booking Dates
# ==========================================================

def validate_booking_dates(check_in: date, check_out: date) -> None:
    """
    Raise HTTP 400 if booking dates are invalid.
    """

    today = date.today()

    if check_in < today:
        raise InvalidBookingDateException(
            "Check-in date cannot be in the past."
        )

    if check_out <= check_in:
        raise InvalidBookingDateException(
            "Check-out date must be after check-in date."
        )


# ==========================================================
# Check Date Overlap
# ==========================================================

def has_date_overlap(
    existing_check_in: date,
    existing_check_out: date,
    new_check_in: date,
    new_check_out: date,
) -> bool:
    """
    Returns True if two date ranges overlap.
    """

    return (
        new_check_in < existing_check_out
        and new_check_out > existing_check_in
    )


# ==========================================================
# Check Room Availability
# ==========================================================

def is_room_available(
    room_id: int,
    check_in: date,
    check_out: date,
    db: Session,
) -> bool:
    """
    Returns True if the room has no overlapping BOOKED reservation.
    """

    conflict = (
        db.query(Reservation)
        .filter(
            Reservation.room_id == room_id,
            Reservation.status == BookingStatus.BOOKED,
            Reservation.check_in  < check_out,
            Reservation.check_out > check_in,
        )
        .first()
    )

    return conflict is None


# ==========================================================
# Search Available Rooms
# ==========================================================

def search_available_rooms(
    check_in: date,
    check_out: date,
    guests: int,
    db: Session,
):
    """
    Return all rooms that are available for the given dates and guest count.
    """

    validate_booking_dates(check_in, check_out)

    rooms = (
        db.query(Room)
        .filter(
            Room.is_available == True,
            Room.capacity >= guests,
        )
        .all()
    )

    return [
        room for room in rooms
        if is_room_available(room.id, check_in, check_out, db)
    ]
