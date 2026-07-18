"""
=========================================================
Room Schemas
Hotel Room Booking System
=========================================================
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator


# ==========================================================
# Create Room
# ==========================================================

class RoomCreate(BaseModel):

    room_number: str

    room_type: str

    floor_number: int

    capacity: int

    bed_type: str

    price: float

    ac: bool = True

    wifi: bool = True

    tv: bool = True

    breakfast_included: bool = False

    description: Optional[str] = None

    image_url: Optional[str] = None

    @field_validator("price")
    @classmethod
    def validate_price(cls, value):

        if value <= 0:

            raise ValueError(
                "Price must be greater than zero."
            )

        return value

    @field_validator("capacity")
    @classmethod
    def validate_capacity(cls, value):

        if value <= 0:

            raise ValueError(
                "Capacity must be greater than zero."
            )

        return value


# ==========================================================
# Update Room
# ==========================================================

class RoomUpdate(BaseModel):

    room_type: Optional[str] = None

    floor_number: Optional[int] = None

    capacity: Optional[int] = None

    bed_type: Optional[str] = None

    price: Optional[float] = None

    ac: Optional[bool] = None

    wifi: Optional[bool] = None

    tv: Optional[bool] = None

    breakfast_included: Optional[bool] = None

    description: Optional[str] = None

    image_url: Optional[str] = None

    is_available: Optional[bool] = None


# ==========================================================
# Search Room
# ==========================================================

class RoomSearch(BaseModel):

    room_type: Optional[str] = None

    guests: Optional[int] = None

    min_price: Optional[float] = None

    max_price: Optional[float] = None


# ==========================================================
# Room Response
# ==========================================================

class RoomResponse(BaseModel):

    id: int

    room_number: str

    room_type: str

    floor_number: int

    capacity: int

    bed_type: str

    price: float

    ac: bool

    wifi: bool

    tv: bool

    breakfast_included: bool

    description: Optional[str]

    image_url: Optional[str]

    rating: float

    is_available: bool

    created_at: datetime

    model_config = {
        "from_attributes": True
    }


# ==========================================================
# Room Card
# ==========================================================

class RoomCardResponse(BaseModel):

    id: int

    room_number: str

    room_type: str

    price: float

    capacity: int

    image_url: Optional[str]

    rating: float

    is_available: bool

    model_config = {
        "from_attributes": True
    }


# ==========================================================
# Room Availability
# ==========================================================

class RoomAvailabilityResponse(BaseModel):

    room_id: int

    room_number: str

    available: bool