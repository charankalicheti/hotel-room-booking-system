from app.constants.booking_constants import BookingStatus
from datetime import date

from app.constants.booking_constants import BookingStatus
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.reservation import Reservation
from app.models.room import Room
from app.models.customer import Customer

from app.schemas.booking_schema import (
    BookingCreate,
    BookingUpdate,
)


# ==========================================================
# Calculate Days
# ==========================================================

def calculate_days(
    check_in: date,
    check_out: date,
):

    days = (check_out - check_in).days

    if days <= 0:

        raise HTTPException(
            status_code=400,
            detail="Invalid booking dates."
        )

    return days


# ==========================================================
# Create Booking
# ==========================================================

def create_booking(
    request: BookingCreate,
    customer: Customer,
    db: Session,
):

    room = (
        db.query(Room)
        .filter(
            Room.id == request.room_id
        )
        .first()
    )

    if not room:

        raise HTTPException(
            status_code=404,
            detail="Room not found."
        )

    if not room.is_available:

        raise HTTPException(
            status_code=400,
            detail="Room is not available."
        )

    if request.guests > room.capacity:

        raise HTTPException(
            status_code=400,
            detail="Room capacity exceeded."
        )

    existing = (
    db.query(Reservation)
    .filter(
        Reservation.room_id == room.id,
        Reservation.status.in_([
            BookingStatus.PENDING_PAYMENT,
            BookingStatus.CONFIRMED,
            BookingStatus.CHECKED_IN,
        ])
    )
    .all()
)

    for booking in existing:

        if (
            request.check_in < booking.check_out
            and
            request.check_out > booking.check_in
        ):

            raise HTTPException(
                status_code=400,
                detail="Room already booked for selected dates."
            )

    days = calculate_days(
        request.check_in,
        request.check_out,
    )

    total_price = room.price * days

    reservation = Reservation(

        customer_id=customer.id,

        customer_name=customer.name,

        room_id=room.id,

        check_in=request.check_in,

        check_out=request.check_out,

        guests=request.guests,

        total_price=total_price,

        status=BookingStatus.PENDING_PAYMENT,

    )

    db.add(reservation)

    db.commit()

    db.refresh(reservation)

    return reservation


# ==========================================================
# Get Customer Bookings
# ==========================================================

def get_my_bookings(
    customer: Customer,
    db: Session,
):

    return (
        db.query(Reservation)
        .filter(
            Reservation.customer_id == customer.id
        )
        .order_by(
            Reservation.created_at.desc()
        )
        .all()
    )


# ==========================================================
# Booking Details
# ==========================================================

def get_booking(
    booking_id: int,
    customer: Customer,
    db: Session,
):

    booking = (
        db.query(Reservation)
        .filter(
            Reservation.id == booking_id,
            Reservation.customer_id == customer.id
        )
        .first()
    )

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found."
        )

    return booking


# ==========================================================
# Cancel Booking
# ==========================================================

def cancel_booking(
    booking_id: int,
    customer: Customer,
    db: Session,
):

    booking = (
        db.query(Reservation)
        .filter(
            Reservation.id == booking_id,
            Reservation.customer_id == customer.id
        )
        .first()
    )

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found."
        )

    booking.status = BookingStatus.CANCELLED

    db.commit()

    db.refresh(booking)

    return {

        "success": True,

        "message": "Booking cancelled successfully."

    }


# ==========================================================
# Update Booking
# ==========================================================

def update_booking(
    booking_id: int,
    request: BookingUpdate,
    customer: Customer,
    db: Session,
):

    booking = (
        db.query(Reservation)
        .filter(
            Reservation.id == booking_id,
            Reservation.customer_id == customer.id
        )
        .first()
    )

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found."
        )

    data = request.model_dump(exclude_unset=True)

    for key, value in data.items():

        setattr(booking, key, value)

    db.commit()

    db.refresh(booking)

    return booking