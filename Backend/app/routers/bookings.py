"""
=========================================================
Bookings Router
Hotel Room Booking System
=========================================================
NOTE: Route order matters in FastAPI.
      Static paths (/rooms/available) must come BEFORE
      parameterised paths (/{customer_id}) to avoid
      FastAPI treating "rooms" as a customer_id integer.
"""

from datetime import date

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.booking_schema import (
    BookingCreate,
    BookingResponse,
    BookingHistory,
    CancelBookingResponse,
)

from app.services.booking_service import (
    create_new_booking,
    get_customer_booking_history,
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
# Static route — MUST be declared before /{customer_id}
# ==========================================================

@router.get(
    "/rooms/available",
    summary="Search available rooms by date and guest count",
)
def available_rooms(
    check_in:  date = Query(..., description="Check-in date  (YYYY-MM-DD)"),
    check_out: date = Query(..., description="Check-out date (YYYY-MM-DD)"),
    guests:    int  = Query(1,   ge=1, description="Number of guests"),
    db: Session = Depends(get_db),
):
    return search_rooms(check_in, check_out, guests, db)


# ==========================================================
# POST /bookings
# ==========================================================

@router.post(
    "",
    response_model=BookingResponse,
    status_code=201,
    summary="Create a new booking",
)
def create_booking(
    request: BookingCreate,
    db: Session = Depends(get_db),
):
    return create_new_booking(request, db)


# ==========================================================
# GET /bookings/{customer_id}
# Parameterised route — MUST come after /rooms/available
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
    return get_customer_booking_history(customer_id, db)


# ==========================================================
# PUT /bookings/{booking_id}/cancel
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
    booking = cancel_customer_booking(booking_id, db)
    return CancelBookingResponse(
        message="Booking cancelled successfully.",
        booking=booking,
    )


# ==========================================================
# DELETE /bookings/{booking_id}
# Permanently removes the reservation row from the database
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
    delete_customer_booking(booking_id, db)
    return None
