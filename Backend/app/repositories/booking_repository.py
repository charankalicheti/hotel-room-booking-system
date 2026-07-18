"""
=========================================================
Booking Repository
Hotel Room Booking System
=========================================================
"""

from datetime import date

from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.room import Room
from app.models.reservation import Reservation

from app.constants.booking_constants import BookingStatus


# ==========================================================
# Customer Operations
# ==========================================================

def get_customer_by_id(
    customer_id: int,
    db: Session,
) -> Customer | None:

    return (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )


def get_customer_by_name(
    name: str,
    db: Session,
) -> Customer | None:

    return (
        db.query(Customer)
        .filter(Customer.name == name)
        .first()
    )


def create_customer(
    name: str,
    email: str,
    password: str,
    db: Session,
) -> Customer:

    customer = Customer(

        name=name,

        email=email,

        password=password,

    )

    db.add(customer)

    db.commit()

    db.refresh(customer)

    return customer


# ==========================================================
# Room Operations
# ==========================================================

def get_room_by_id(
    room_id: int,
    db: Session,
) -> Room | None:

    return (
        db.query(Room)
        .filter(Room.id == room_id)
        .first()
    )


def get_room_by_number(
    room_number: str,
    db: Session,
) -> Room | None:

    return (
        db.query(Room)
        .filter(Room.room_number == room_number)
        .first()
    )


# ==========================================================
# Reservation CRUD
# ==========================================================

def create_booking(
    reservation: Reservation,
    db: Session,
) -> Reservation:

    db.add(reservation)

    db.commit()

    db.refresh(reservation)

    return reservation


def get_booking_by_id(
    booking_id: int,
    db: Session,
) -> Reservation | None:

    return (
        db.query(Reservation)
        .filter(Reservation.id == booking_id)
        .first()
    )


def get_booking_history(
    customer_id: int,
    db: Session,
) -> list[Reservation]:

    return (
        db.query(Reservation)
        .filter(
            Reservation.customer_id == customer_id
        )
        .order_by(
            Reservation.created_at.desc()
        )
        .all()
    )


# ==========================================================
# Get All Bookings (Admin / Reception)
# ==========================================================

def get_all_bookings(
    db: Session,
) -> list[Reservation]:

    return (
        db.query(Reservation)
        .order_by(
            Reservation.created_at.desc()
        )
        .all()
    )


# ==========================================================
# Update Booking
# ==========================================================

def update_booking(
    booking: Reservation,
    db: Session,
) -> Reservation:

    db.commit()

    db.refresh(booking)

    return booking


# ==========================================================
# Cancel Booking
# ==========================================================

def cancel_booking(
    booking: Reservation,
    db: Session,
) -> Reservation:

    booking.status = BookingStatus.CANCELLED

    db.commit()

    db.refresh(booking)

    return booking


# ==========================================================
# Delete Booking
# ==========================================================

def delete_booking(
    booking: Reservation,
    db: Session,
):

    db.delete(booking)

    db.commit()


# ==========================================================
# Availability Check
# ==========================================================

def get_existing_reservation(
    room_id: int,
    check_in: date,
    check_out: date,
    db: Session,
) -> Reservation | None:

    return (
        db.query(Reservation)
        .filter(
            Reservation.room_id == room_id,

            Reservation.status == BookingStatus.CONFIRMED,

            Reservation.check_in < check_out,

            Reservation.check_out > check_in,
        )
        .first()
    )