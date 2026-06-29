from pydantic import BaseModel
from typing import Optional


class RoomCreate(BaseModel):
    hotel_id: int
    room_number: str
    room_type: str
    price: float
    capacity: int
    is_available: bool = True


class RoomUpdate(BaseModel):
    room_number: Optional[str] = None
    room_type: Optional[str] = None
    price: Optional[float] = None
    capacity: Optional[int] = None
    is_available: Optional[bool] = None


class RoomResponse(BaseModel):
    id: int
    hotel_id: int
    room_number: str
    room_type: str
    price: float
    capacity: int
    is_available: bool

    class Config:
        from_attributes = True