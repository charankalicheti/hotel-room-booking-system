from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import admin_required
from app.schemas.walk_in_schema import WalkInBookingListItem, WalkInBookingResponse, WalkInCustomerCreate
from app.services.walk_in_service import create_walk_in_booking, get_available_rooms, get_walk_in_bookings

router = APIRouter(prefix="/admin/walk-in", tags=["Walk-in Booking"])


@router.post("", response_model=WalkInBookingResponse)
def create_walk_in_booking_route(
    payload: WalkInCustomerCreate,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):
    return create_walk_in_booking(payload, db)


@router.get("/rooms", response_model=list)
def list_available_rooms(
    check_in: str | None = Query(default=None),
    check_out: str | None = Query(default=None),
    guests: int | None = Query(default=None),
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):
    from datetime import datetime

    start = None
    end = None
    if check_in:
        start = datetime.strptime(check_in, "%Y-%m-%d").date()
    if check_out:
        end = datetime.strptime(check_out, "%Y-%m-%d").date()
    rooms = get_available_rooms(db, start, end, guests)
    return [{
        "id": room.id,
        "room_number": room.room_number,
        "room_type": room.room_type,
        "capacity": room.capacity,
        "price": room.price,
        "is_available": room.is_available,
    } for room in rooms]


@router.get("", response_model=list[WalkInBookingListItem])
def list_walk_in_bookings(
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):
    return get_walk_in_bookings(db)
