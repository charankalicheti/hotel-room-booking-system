"""
=========================================================
Booking Schemas
Hotel Room Booking System
=========================================================
"""

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator, model_validator

from app.constants.booking_constants import BookingStatus


# ==========================================================
# Request Schemas
# ==========================================================

class BookingCreate(BaseModel):

    customer_id: int
    room_id: int
    check_in: date
    check_out: date
    guests: int = Field(default=1, ge=1)

    @model_validator(mode="after")
    def check_dates(self):
        if self.check_in and self.check_out:
            if self.check_out <= self.check_in:
                raise ValueError("check_out date must be after check_in date.")
        return self

    model_config = {"from_attributes": True}


class CancelBooking(BaseModel):
    reason: Optional[str] = None


# ==========================================================
# Response Schemas
# ==========================================================

class BookingResponse(BaseModel):

    id: int
    customer_id: int
    room_id: int
    check_in: date
    check_out: date
    guests: int
    total_price: float
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class BookingHistory(BaseModel):

    id: int
    room_id: int
    check_in: date
    check_out: date
    total_price: float
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class CancelBookingResponse(BaseModel):

    message: str
    booking: BookingResponse
