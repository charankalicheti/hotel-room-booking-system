from pydantic import BaseModel
from typing import Optional


class HotelCreate(BaseModel):
    name: str
    location: str
    description: Optional[str] = None


class HotelUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None


class HotelResponse(BaseModel):
    id: int
    name: str
    location: str
    description: Optional[str]

    class Config:
        from_attributes = True