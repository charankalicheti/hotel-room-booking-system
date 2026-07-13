from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.hotel_schema import (
    HotelUpdate,
    HotelResponse,
)
from app.services.hotel_service import (
    get_hotel_details,
    update_hotel_details,
)


router = APIRouter(
    prefix="/hotel",
    tags=["Hotel"],
)


# ==========================================================
# GET /hotel
# Get Single Hotel Details
# ==========================================================

@router.get(
    "",
    response_model=HotelResponse,
    summary="Get Hotel Details",
)
def hotel_details(
    db: Session = Depends(get_db),
):
    return get_hotel_details(db)


# ==========================================================
# PUT /hotel
# Update Single Hotel Details
# ==========================================================

@router.put(
    "",
    response_model=HotelResponse,
    summary="Update Hotel Details",
)
def update_hotel(
    request: HotelUpdate,
    db: Session = Depends(get_db),
):
    return update_hotel_details(
        request,
        db,
    )