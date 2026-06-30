"""
=========================================================
Booking Service
Hotel Room Booking System
=========================================================
"""

from sqlalchemy.orm import Session

from app.constants.booking_constants import BookingStatus
from app.models.reservation import Reservation
from app.schemas.booking_schema import BookingCreate

from app.repositories.booking_repository import (
    get_customer_by_id,
    get_room_by_id,
    create_booking,
    get_booking_by_id,
    get_booking_history,
    cancel_booking,
    delete_booking,
    get_existing_reservation,
)

from app.utils.room_availability import (
    validate_booking_dates,
    search_available_rooms,
)

from app.exceptions.booking_exceptions import (
    CustomerNotFoundException,
    RoomNotFoundException,
    BookingNotFoundException,
    RoomUnavailableException,
    BookingAlreadyCancelledException,
)


# ==========================================================
# Create Booking
# ==========================================================

def create_new_booking(
    request: BookingCreate,
    db: Session,
) -> Reservation:
    """
    Validate inputs, check availability, compute price, persist reservation.
    """

    # 1. Validate dates — raises HTTP 400 on bad input
    validate_booking_dates(request.check_in, request.check_out)

    # 2. Customer must exist (read-only, Member 1 owns this table)
    customer = get_customer_by_id(request.customer_id, db)
    if not customer:
        raise CustomerNotFoundException()

    # 3. Room must exist (read-only, Member 1 owns this table)
    room = get_room_by_id(request.room_id, db)
    if not room:
        raise RoomNotFoundException()

    # 4. Prevent double booking
    conflict = get_existing_reservation(
        room.id, request.check_in, request.check_out, db
    )
    if conflict:
        raise RoomUnavailableException()

    # 5. Calculate total price
    total_days  = (request.check_out - request.check_in).days
    total_price = total_days * room.price

    # 6. Build and persist reservation
    reservation = Reservation(
        customer_id = request.customer_id,
        room_id     = request.room_id,
        check_in    = request.check_in,
        check_out   = request.check_out,
        guests      = request.guests,
        total_price = total_price,
        status      = BookingStatus.BOOKED,
    )

    return create_booking(reservation, db)


# ==========================================================
# Get Single Booking
# ==========================================================

def get_booking(
    booking_id: int,
    db: Session,
) -> Reservation:
    """
    Fetch booking by ID; raise 404 if not found.
    """
    booking = get_booking_by_id(booking_id, db)
    if not booking:
        raise BookingNotFoundException()
    return booking


# ==========================================================
# Booking History
# ==========================================================

def get_customer_booking_history(
    customer_id: int,
    db: Session,
) -> list[Reservation]:
    """
    Return all bookings for a customer. Validates customer exists first.
    """
    customer = get_customer_by_id(customer_id, db)
    if not customer:
        raise CustomerNotFoundException()

    return get_booking_history(customer_id, db)


# ==========================================================
# Cancel Booking
# ==========================================================

def cancel_customer_booking(
    booking_id: int,
    db: Session,
) -> Reservation:
    """
    Cancel a booking; raise 404 if not found, 400 if already cancelled.
    """
    booking = get_booking_by_id(booking_id, db)
    if not booking:
        raise BookingNotFoundException()

    if booking.status == BookingStatus.CANCELLED:
        raise BookingAlreadyCancelledException()

    return cancel_booking(booking, db)


# ==========================================================
# Delete Booking (permanent removal)
# ==========================================================

def delete_customer_booking(
    booking_id: int,
    db: Session,
) -> None:
    """
    Permanently delete a booking record; raise 404 if not found.
    """
    booking = get_booking_by_id(booking_id, db)
    if not booking:
        raise BookingNotFoundException()

    delete_booking(booking, db)


# ==========================================================
# Search Available Rooms
# ==========================================================

def search_rooms(
    check_in,
    check_out,
    guests: int,
    db: Session,
):
    """
    Return rooms available for the given dates and guest count.
    """
    return search_available_rooms(check_in, check_out, guests, db)
