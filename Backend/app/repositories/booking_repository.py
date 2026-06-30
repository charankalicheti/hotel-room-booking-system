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
    """
    Fetch a customer row by primary key. Returns None if not found.
    """
    return (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )


# ==========================================================
# Room Operations
# ==========================================================

def get_room_by_id(
    room_id: int,
    db: Session,
) -> Room | None:
    """
    Fetch a room row by primary key. Returns None if not found.
    """
    return (
        db.query(Room)
        .filter(Room.id == room_id)
        .first()
    )


# ==========================================================
# Reservation CRUD
# ==========================================================

def create_booking(
    reservation: Reservation,
    db: Session,
) -> Reservation:
    """
    Persist a new reservation and return the refreshed row.
    """
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation


def get_booking_by_id(
    booking_id: int,
    db: Session,
) -> Reservation | None:
    """
    Fetch a reservation by its primary key. Returns None if not found.
    """
    return (
        db.query(Reservation)
        .filter(Reservation.id == booking_id)
        .first()
    )


def get_booking_history(
    customer_id: int,
    db: Session,
) -> list[Reservation]:
    """
    Return all reservations for a customer, newest first.
    """
    return (
        db.query(Reservation)
        .filter(Reservation.customer_id == customer_id)
        .order_by(Reservation.created_at.desc())
        .all()
    )


def cancel_booking(
    booking: Reservation,
    db: Session,
) -> Reservation:
    """
    Set booking status to CANCELLED and persist.
    """
    booking.status = BookingStatus.CANCELLED
    db.commit()
    db.refresh(booking)
    return booking


def delete_booking(
    booking: Reservation,
    db: Session,
) -> None:
    """
    Permanently remove a reservation row from the database.
    """
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
    """
    Return a conflicting BOOKED reservation if one exists, else None.
    Overlap condition: existing.check_in < new.check_out AND existing.check_out > new.check_in
    """
    return (
        db.query(Reservation)
        .filter(
            Reservation.room_id == room_id,
            Reservation.status  == BookingStatus.BOOKED,
            Reservation.check_in  < check_out,
            Reservation.check_out > check_in,
        )
        .first()
    )
