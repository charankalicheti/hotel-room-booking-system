from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.dependencies import admin_required

from app.schemas.room_schema import (
    RoomCreate,
    RoomUpdate,
    RoomResponse,
)

from app.services.room_service import (
    create_room,
    get_all_rooms,
    update_room,
    delete_room,
)
from app.repositories.report_repository import get_dashboard_statistics

from app.services.auth_service import (
    get_all_customers,
    delete_customer,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

# ==========================================================
# Rooms
# ==========================================================

@router.post(
    "/rooms",
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


@router.get(
    "/rooms",
    response_model=List[RoomResponse],
)
def list_rooms(
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):

    return get_all_rooms(db)


@router.get(
    "/dashboard",
)
def dashboard(
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):

    return get_dashboard_statistics(db)


@router.put(
    "/rooms/{room_id}",
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


@router.delete(
    "/rooms/{room_id}",
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


# ==========================================================
# Customers
# ==========================================================

@router.get(
    "/customers",
)
def customers(
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):

    return get_all_customers(db)


@router.delete(
    "/customers/{customer_id}",
)
def remove_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required),
):

    return delete_customer(
        customer_id,
        db,
    )