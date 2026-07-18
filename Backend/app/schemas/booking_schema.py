from datetime import date
from pydantic import BaseModel, Field, model_validator


# ==========================================================
# Create Booking
# ==========================================================

class BookingCreate(BaseModel):

    room_id: int

    check_in: date

    check_out: date

    guests: int = Field(..., gt=0)

    @model_validator(mode="after")
    def validate_dates(self):

        if self.check_out <= self.check_in:
            raise ValueError(
                "Check-out date must be greater than check-in date."
            )

        return self


# ==========================================================
# Booking Response
# ==========================================================

class BookingResponse(BaseModel):

    id: int

    customer_id: int

    customer_name: str

    room_id: int

    check_in: date

    check_out: date

    guests: int

    total_price: float

    status: str

    model_config = {
        "from_attributes": True
    }


# ==========================================================
# Booking Update
# ==========================================================

class BookingUpdate(BaseModel):

    check_in: date | None = None

    check_out: date | None = None

    guests: int | None = None

    status: str | None = None