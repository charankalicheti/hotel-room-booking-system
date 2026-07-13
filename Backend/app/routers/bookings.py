"""
=========================================================
Bookings Router
Hotel Room Booking System
=========================================================

NOTE:
Route order matters in FastAPI.

Static paths:
    /rooms/available
    /rooms/booked-dates

must come BEFORE parameterised paths:
    /{customer_id}
"""

from datetime import date

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.reservation import Reservation

from app.schemas.booking_schema import (
    BookingCreate,
    BookingResponse,
    BookingHistory,
    CancelBookingResponse,
)

from app.services.booking_service import (
    create_new_booking,
    get_customer_booking_history,
    get_all_bookings_admin,
    cancel_customer_booking,
    delete_customer_booking,
    search_rooms,
)


router = APIRouter(
    prefix="/bookings",
    tags=["Booking"],
)


# ==========================================================
# GET /bookings/rooms/available
# Search Available Rooms
# ==========================================================

@router.get(
    "/rooms/available",
    summary="Search available rooms by date and guest count",
)
def available_rooms(
    check_in: date = Query(
        ...,
        description="Check-in date (YYYY-MM-DD)",
    ),
    check_out: date = Query(
        ...,
        description="Check-out date (YYYY-MM-DD)",
    ),
    guests: int = Query(
        1,
        ge=1,
        description="Number of guests",
    ),
    db: Session = Depends(get_db),
):
    return search_rooms(
        check_in,
        check_out,
        guests,
        db,
    )


# ==========================================================
# GET /bookings/rooms/booked-dates
# Get Booked Dates For All Rooms
# ==========================================================

@router.get(
    "/rooms/booked-dates",
    summary="Get booked dates for all rooms",
)
def get_room_booked_dates(
    db: Session = Depends(get_db),
):

    reservations = (
        db.query(Reservation)
        .filter(
            Reservation.status == "BOOKED"
        )
        .order_by(
            Reservation.room_id,
            Reservation.check_in,
        )
        .all()
    )

    booked_dates = {}

    for reservation in reservations:

        room_id = str(
            reservation.room_id
        )

        if room_id not in booked_dates:
            booked_dates[room_id] = []

        booked_dates[room_id].append({
            "check_in": reservation.check_in,
            "check_out": reservation.check_out,
        })

    return booked_dates


# ==========================================================
# POST /bookings
# Create Booking
# ==========================================================

@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new booking",
)
def create_booking(
    request: BookingCreate,
    db: Session = Depends(get_db),
):
    return create_new_booking(
        request,
        db,
    )


# ==========================================================
# GET /bookings
# Admin - View All Bookings
# ==========================================================

@router.get(
    "",
    response_model=list[BookingHistory],
    summary="Get all bookings (Admin)",
)
def get_all_bookings(
    db: Session = Depends(get_db),
):
    return get_all_bookings_admin(db)


# ==========================================================
# GET /bookings/{customer_id}
# Customer Booking History
#
# IMPORTANT:
# Parameterised route must come AFTER static room routes.
# ==========================================================

@router.get(
    "/{customer_id}",
    response_model=list[BookingHistory],
    summary="Get booking history for a customer",
)
def booking_history(
    customer_id: int,
    db: Session = Depends(get_db),
):
    return get_customer_booking_history(
        customer_id,
        db,
    )


# ==========================================================
# PUT /bookings/{booking_id}/cancel
# Cancel Booking
# ==========================================================

@router.put(
    "/{booking_id}/cancel",
    response_model=CancelBookingResponse,
    summary="Cancel an existing booking",
)
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
):

    booking = cancel_customer_booking(
        booking_id,
        db,
    )

    return CancelBookingResponse(
        message="Booking cancelled successfully.",
        booking=booking,
    )


# ==========================================================
# DELETE /bookings/{booking_id}
# Permanently Delete Booking
# ==========================================================

@router.delete(
    "/{booking_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Permanently delete a booking",
)
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
):

    delete_customer_booking(
        booking_id,
        db,
    )

    return None