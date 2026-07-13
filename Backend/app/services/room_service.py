from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.room import Room
from app.schemas.room_schema import RoomCreate, RoomUpdate


def create_room(request: RoomCreate, db: Session):
    room = Room(
        room_number=request.room_number,
        room_type=request.room_type,
        price=request.price,
        capacity=request.capacity,
        description=request.description,
        is_available=request.is_available
    )

    try:
        db.add(room)
        db.commit()
        db.refresh(room)
        return room
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room number already exists. Please choose a different one."
        ) from exc


def get_all_rooms(db: Session):
    return db.query(Room).all()


def get_room_by_id(room_id: int, db: Session):
    room = db.query(Room).filter(Room.id == room_id).first()

    if not room:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found"
        )

    return room


def update_room(room_id: int, request: RoomUpdate, db: Session):
    room = get_room_by_id(room_id, db)

    update_data = request.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(room, key, value)

    db.commit()
    db.refresh(room)

    return room


def delete_room(room_id: int, db: Session):
    room = get_room_by_id(room_id, db)

    try:
        db.delete(room)
        db.commit()

        return {"message": "Room deleted successfully"}

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete room because it has existing reservations."
        )