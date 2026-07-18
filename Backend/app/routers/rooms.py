from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import admin_required

from app.schemas.room_schema import (
    RoomCreate,
    RoomUpdate,
    RoomResponse,
    RoomSearch,
)

from app.services.room_service import (
    get_all_rooms,
    get_room_by_id,
    search_rooms,
    create_room,
    update_room,
    delete_room,
)

router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"],
)


# ==========================================================
# Get All Rooms
# ==========================================================

@router.get(
    "/",
    response_model=list[RoomResponse],
)
def all_rooms(
    db: Session = Depends(get_db),
):
    return get_all_rooms(db)


# ==========================================================
# Get Room By ID
# ==========================================================

@router.get(
    "/{room_id}",
    response_model=RoomResponse,
)
def room_details(
    room_id: int,
    db: Session = Depends(get_db),
):
    return get_room_by_id(
        room_id,
        db,
    )


# ==========================================================
# Search Rooms
# ==========================================================

@router.post(
    "/search",
    response_model=list[RoomResponse],
)
def search(
    request: RoomSearch,
    db: Session = Depends(get_db),
):
    return search_rooms(
        request,
        db,
    )


# ==========================================================
# Create Room (Admin)
# ==========================================================

@router.post(
    "/",
    response_model=RoomResponse,
)
def add_room(
    request: RoomCreate,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):
    return create_room(
        request,
        db,
    )


# ==========================================================
# Update Room (Admin)
# ==========================================================

@router.put(
    "/{room_id}",
    response_model=RoomResponse,
)
def edit_room(
    room_id: int,
    request: RoomUpdate,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):
    return update_room(
        room_id,
        request,
        db,
    )


# ==========================================================
# Delete Room (Admin)
# ==========================================================

@router.delete(
    "/{room_id}",
)
def remove_room(
    room_id: int,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):
    return delete_room(
        room_id,
        db,
    )