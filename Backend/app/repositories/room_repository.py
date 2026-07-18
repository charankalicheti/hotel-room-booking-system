"""
=========================================================
Room Repository
Hotel Room Booking System
=========================================================
"""

from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.models.room import Room


# ==========================================================
# Create Room
# ==========================================================

def create_room(
    room: Room,
    db: Session,
) -> Room:

    db.add(room)

    db.commit()

    db.refresh(room)

    return room


# ==========================================================
# Update Room
# ==========================================================

def update_room(
    room: Room,
    db: Session,
) -> Room:

    db.commit()

    db.refresh(room)

    return room


# ==========================================================
# Delete Room
# ==========================================================

def delete_room(
    room: Room,
    db: Session,
):

    db.delete(room)

    db.commit()


# ==========================================================
# Get Room By Id
# ==========================================================

def get_room_by_id(
    room_id: int,
    db: Session,
) -> Room | None:

    return (
        db.query(Room)
        .filter(
            Room.id == room_id
        )
        .first()
    )


# ==========================================================
# Get Room By Number
# ==========================================================

def get_room_by_number(
    room_number: str,
    db: Session,
) -> Room | None:

    return (
        db.query(Room)
        .filter(
            Room.room_number == room_number
        )
        .first()
    )


# ==========================================================
# Get All Rooms
# ==========================================================

def get_all_rooms(
    db: Session,
):

    return (
        db.query(Room)
        .order_by(Room.room_number)
        .all()
    )


# ==========================================================
# Get Available Rooms
# ==========================================================

def get_available_rooms(
    db: Session,
):

    return (
        db.query(Room)
        .filter(
            Room.is_available == True
        )
        .order_by(Room.price)
        .all()
    )


# ==========================================================
# Search Rooms
# ==========================================================

def search_rooms(
    room_type: str | None,
    guests: int | None,
    min_price: float | None,
    max_price: float | None,
    db: Session,
):

    query = db.query(Room)

    if room_type:

        query = query.filter(
            Room.room_type == room_type
        )

    if guests:

        query = query.filter(
            Room.capacity >= guests
        )

    if min_price is not None:

        query = query.filter(
            Room.price >= min_price
        )

    if max_price is not None:

        query = query.filter(
            Room.price <= max_price
        )

    query = query.filter(
        Room.is_available == True
    )

    return query.order_by(Room.price).all()


# ==========================================================
# Total Rooms
# ==========================================================

def total_rooms(
    db: Session,
):

    return db.query(Room).count()


# ==========================================================
# Available Rooms Count
# ==========================================================

def available_rooms_count(
    db: Session,
):

    return (
        db.query(Room)
        .filter(
            Room.is_available == True
        )
        .count()
    )


# ==========================================================
# Occupied Rooms Count
# ==========================================================

def occupied_rooms_count(
    db: Session,
):

    return (
        db.query(Room)
        .filter(
            Room.is_available == False
        )
        .count()
    )