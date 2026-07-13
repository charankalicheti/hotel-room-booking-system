from pydantic import BaseModel


# ==========================================================
# Hotel Update Schema
# ==========================================================

class HotelUpdate(BaseModel):
    name: str
    location: str


# ==========================================================
# Hotel Response Schema
# ==========================================================

class HotelResponse(BaseModel):
    id: int
    name: str
    location: str
    rooms: int

    class Config:
        from_attributes = True