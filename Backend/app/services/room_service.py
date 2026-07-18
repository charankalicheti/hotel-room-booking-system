"""
=========================================================
Room Service
Hotel Room Booking System
=========================================================
"""

from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

from app.models.room import Room

from app.schemas.room_schema import (
    RoomCreate,
    RoomUpdate,
    RoomSearch,
)

from app.repositories.room_repository import (
    create_room as repo_create_room,
    update_room as repo_update_room,
    get_room_by_id as repo_get_room_by_id,
    get_room_by_number,
    get_all_rooms as repo_get_all_rooms,
)


# ==========================================================
# Get All Rooms
# ==========================================================

def get_all_rooms(
    db: Session,
):

    return repo_get_all_rooms(db)


# ==========================================================
# Get Room By Id
# ==========================================================

def get_room_by_id(
    room_id: int,
    db: Session,
):

    room = repo_get_room_by_id(
        room_id,
        db,
    )

    if room is None:

        raise HTTPException(
            status_code=404,
            detail="Room not found."
        )

    return room


# ==========================================================
# Create Room
# ==========================================================

def create_room(
    request: RoomCreate,
    db: Session,
):

    existing_room = get_room_by_number(
        request.room_number,
        db,
    )

    if existing_room:

        raise HTTPException(
            status_code=400,
            detail="Room number already exists."
        )

    room = Room(

        room_number=request.room_number,

        room_type=request.room_type,

        floor_number=request.floor_number,

        capacity=request.capacity,

        bed_type=request.bed_type,

        price=request.price,

        ac=request.ac,

        wifi=request.wifi,

        tv=request.tv,

        breakfast_included=request.breakfast_included,

        description=request.description,

        image_url=request.image_url,

        rating=4.5,

        is_available=True,

    )

    return repo_create_room(
        room,
        db,
    )
# ==========================================================
# Search Rooms
# ==========================================================

from app.repositories.room_repository import (
    search_rooms as repo_search_rooms,
)


def search_rooms(
    request: RoomSearch,
    db: Session,
):

    rooms = repo_search_rooms(

        room_type=request.room_type,

        guests=request.guests,

        min_price=request.min_price,

        max_price=request.max_price,

        db=db,

    )

    return rooms


# ==========================================================
# Update Room
# ==========================================================

def update_room(

    room_id: int,

    request: RoomUpdate,

    db: Session,

):

    room = repo_get_room_by_id(

        room_id,

        db,

    )

    if room is None:

        raise HTTPException(

            status_code=404,

            detail="Room not found."

        )

    data = request.model_dump(
        exclude_unset=True
    )

    # ------------------------------
    # Room Number Validation
    # ------------------------------

    if "room_number" in data:

        existing_room = get_room_by_number(

            data["room_number"],

            db,

        )

        if existing_room and existing_room.id != room.id:

            raise HTTPException(

                status_code=400,

                detail="Room number already exists."

            )

    # ------------------------------
    # Update Fields
    # ------------------------------

    for key, value in data.items():

        setattr(
            room,
            key,
            value,
        )

    return repo_update_room(

        room,

        db,

    )
# ==========================================================
# Repository Imports
# ==========================================================

from app.repositories.room_repository import (
    delete_room as repo_delete_room,
    total_rooms,
    available_rooms_count,
    occupied_rooms_count,
)


# ==========================================================
# Delete Room
# ==========================================================

def delete_room(
    room_id: int,
    db: Session,
):

    room = repo_get_room_by_id(
        room_id,
        db,
    )

    if room is None:
        raise HTTPException(
            status_code=404,
            detail="Room not found."
        )

    try:

        repo_delete_room(
            room,
            db,
        )

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Cannot delete this room because it has existing bookings."
        )

    return {
        "success": True,
        "message": "Room deleted successfully."
    }


# ==========================================================
# Available Rooms
# ==========================================================

def get_available_rooms(
    db: Session,
):

    rooms = repo_get_all_rooms(db)

    return [

        room

        for room in rooms

        if room.is_available

    ]


# ==========================================================
# Room Dashboard Summary
# ==========================================================

def room_dashboard_summary(
    db: Session,
):

    return {

        "total_rooms": total_rooms(db),

        "available_rooms": available_rooms_count(db),

        "occupied_rooms": occupied_rooms_count(db),

    }


# ==========================================================
# Toggle Availability
# ==========================================================

def change_room_availability(

    room_id: int,

    available: bool,

    db: Session,

):

    room = repo_get_room_by_id(

        room_id,

        db,

    )

    if room is None:

        raise HTTPException(

            status_code=404,

            detail="Room not found."

        )

    room.is_available = available

    repo_update_room(

        room,

        db,

    )

    return room


# ==========================================================
# Room Details
# ==========================================================

def room_details(
    room_id: int,
    db: Session,
):

    room = repo_get_room_by_id(
        room_id,
        db,
    )

    if room is None:

        raise HTTPException(
            status_code=404,
            detail="Room not found."
        )

    return room