from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.dependencies import admin_required
from app.schemas.room_schema import RoomCreate, RoomUpdate, RoomResponse
from app.services.room_service import (
    create_room,
    get_all_rooms,
    update_room,
    delete_room
)

router = APIRouter(prefix="/rooms", tags=["Admin - Rooms"])


@router.post("/", response_model=RoomResponse)
def add_room(
    request: RoomCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    return create_room(request, db)


@router.get("/", response_model=List[RoomResponse])
def list_rooms(db: Session = Depends(get_db)):
    return get_all_rooms(db)


@router.put("/{room_id}", response_model=RoomResponse)
def edit_room(
    room_id: int,
    request: RoomUpdate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    return update_room(room_id, request, db)


@router.delete("/{room_id}")
def remove_room(
    room_id: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    return delete_room(room_id, db)