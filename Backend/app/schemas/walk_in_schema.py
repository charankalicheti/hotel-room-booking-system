from datetime import date
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class WalkInCustomerCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    mobile_number: str = Field(..., min_length=8, max_length=20)
    email: Optional[str] = None
    id_proof_type: str = Field(..., min_length=2, max_length=50)
    id_proof_number: str = Field(..., min_length=2, max_length=100)
    address: str = Field(..., min_length=2, max_length=300)
    guests: int = Field(..., gt=0)
    room_id: int
    check_in: date
    check_out: date
    special_requests: Optional[str] = None
    payment_method: str = Field(default="CASH")
    discount: float = Field(default=0.0, ge=0)

    model_config = ConfigDict(str_strip_whitespace=True)


class WalkInBookingResponse(BaseModel):
    id: int
    customer_id: int
    customer_name: str
    room_id: int
    room_number: Optional[str] = None
    room_type: Optional[str] = None
    check_in: date
    check_out: date
    guests: int
    total_price: float
    tax: float
    discount: float
    status: str
    payment_status: str
    payment_method: str
    special_requests: Optional[str] = None
    booking_reference: str
    model_config = ConfigDict(from_attributes=True)


class WalkInBookingListItem(BaseModel):
    id: int
    customer_name: str
    room_number: Optional[str] = None
    check_in: date
    check_out: date
    guests: int
    total_price: float
    status: str
    payment_status: str
    booking_reference: str
    model_config = ConfigDict(from_attributes=True)
