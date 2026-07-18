"""
=========================================================
Receptionist Router
Hotel Room Booking System
=========================================================
"""

from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.services.receptionist_service import (
    get_all_reservations,
    customer_check_in,
    customer_check_out,
)

router = APIRouter(
    prefix="/reception",
    tags=["Reception"],
)


# ==========================================================
# Get All Reservations
# ==========================================================

@router.get(
    "/reservations",
    summary="Get All Reservations",
)
def reservations(

    db: Session = Depends(get_db),

):

    return get_all_reservations(

        db,

    )


# ==========================================================
# Customer Check In
# ==========================================================

@router.put(
    "/check-in/{booking_id}",
    summary="Customer Check In",
)
def check_in(

    booking_id: int,

    db: Session = Depends(get_db),

):

    return customer_check_in(

        booking_id,

        db,

    )


# ==========================================================
# Customer Check Out
# ==========================================================

@router.put(
    "/check-out/{booking_id}",
    summary="Customer Check Out",
)
def check_out(

    booking_id: int,

    db: Session = Depends(get_db),

):

    return customer_check_out(

        booking_id,

        db,

    )