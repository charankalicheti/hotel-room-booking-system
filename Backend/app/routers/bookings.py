from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.customer import Customer

from app.schemas.booking_schema import (
    BookingCreate,
    BookingResponse,
    BookingUpdate,
)

from app.services.booking_service import (
    create_booking,
    get_my_bookings,
    get_booking,
    update_booking,
    cancel_booking,
)

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)


# ==========================================================
# Create Booking
# ==========================================================

@router.post(
    "/",
    response_model=BookingResponse,
)
def create(

    request: BookingCreate,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return create_booking(

        request,

        current_user,

        db,

    )


# ==========================================================
# Get My Bookings
# ==========================================================

@router.get(
    "/",
    response_model=list[BookingResponse],
)
def my_bookings(

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return get_my_bookings(

        current_user,

        db,

    )


# ==========================================================
# Booking Details
# ==========================================================

@router.get(
    "/{booking_id}",
    response_model=BookingResponse,
)
def booking_details(

    booking_id: int,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return get_booking(

        booking_id,

        current_user,

        db,

    )


# ==========================================================
# Update Booking
# ==========================================================

@router.put(
    "/{booking_id}",
    response_model=BookingResponse,
)
def update(

    booking_id: int,

    request: BookingUpdate,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return update_booking(

        booking_id,

        request,

        current_user,

        db,

    )


# ==========================================================
# Cancel Booking
# ==========================================================

@router.delete(
    "/{booking_id}",
)
def cancel(

    booking_id: int,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return cancel_booking(

        booking_id,

        current_user,

        db,

    )