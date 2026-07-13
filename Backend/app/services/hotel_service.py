from sqlalchemy.orm import Session

from app.schemas.hotel_schema import HotelUpdate

from app.repositories.hotel_repository import (
    get_hotel,
    create_default_hotel,
    update_hotel,
    get_total_rooms,
)


# ==========================================================
# Get Single Hotel Details
# ==========================================================

def get_hotel_details(db: Session):

    hotel = get_hotel(db)

    if hotel is None:
        hotel = create_default_hotel(db)

    total_rooms = get_total_rooms(db)

    return {
        "id": hotel.id,
        "name": hotel.name,
        "location": hotel.location,
        "rooms": total_rooms,
    }


# ==========================================================
# Update Single Hotel Details
# ==========================================================

def update_hotel_details(
    request: HotelUpdate,
    db: Session,
):

    hotel = get_hotel(db)

    if hotel is None:
        hotel = create_default_hotel(db)

    hotel = update_hotel(
        hotel=hotel,
        name=request.name,
        location=request.location,
        db=db,
    )

    total_rooms = get_total_rooms(db)

    return {
        "id": hotel.id,
        "name": hotel.name,
        "location": hotel.location,
        "rooms": total_rooms,
    }