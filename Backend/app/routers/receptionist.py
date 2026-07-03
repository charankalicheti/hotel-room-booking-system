"""
=========================================================
Receptionist Router
Hotel Room Booking System
=========================================================
"""

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.services.receptionist_service import (
    customer_check_in,
    customer_check_out,
)

router = APIRouter(
    prefix="/reception",
    tags=["Reception"],
)


# ==========================================================
# Check In
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
# Check Out
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