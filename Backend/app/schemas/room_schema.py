from pydantic import BaseModel
from typing import Optional


class RoomCreate(BaseModel):
    room_number: str
    room_type: str
    price: float
    capacity: int
    description: Optional[str] = None
    is_available: bool = True


class RoomUpdate(BaseModel):
    room_number: Optional[str] = None
    room_type: Optional[str] = None
    price: Optional[float] = None
    capacity: Optional[int] = None
    description: Optional[str] = None
    is_available: Optional[bool] = None


class RoomResponse(BaseModel):
    id: int
    room_number: str
    room_type: str
    price: float
    capacity: int
    description: Optional[str]
    is_available: bool

    class Config:
        from_attributes = True