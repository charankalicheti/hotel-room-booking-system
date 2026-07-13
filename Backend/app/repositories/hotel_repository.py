from sqlalchemy.orm import Session

from app.models.hotel import Hotel
from app.models.room import Room


# ==========================================================
# Get Single Hotel
# ==========================================================

def get_hotel(db: Session) -> Hotel | None:
    return (
        db.query(Hotel)
        .order_by(Hotel.id.asc())
        .first()
    )


# ==========================================================
# Create Default Hotel
# ==========================================================

def create_default_hotel(db: Session) -> Hotel:

    hotel = Hotel(
        name="Taj Hotel",
        location="Hyderabad",
    )

    db.add(hotel)
    db.commit()
    db.refresh(hotel)

    return hotel


# ==========================================================
# Update Hotel
# ==========================================================

def update_hotel(
    hotel: Hotel,
    name: str,
    location: str,
    db: Session,
) -> Hotel:

    hotel.name = name
    hotel.location = location

    db.commit()
    db.refresh(hotel)

    return hotel


# ==========================================================
# Get Total Rooms Count
# ==========================================================

def get_total_rooms(db: Session) -> int:
    return db.query(Room).count()