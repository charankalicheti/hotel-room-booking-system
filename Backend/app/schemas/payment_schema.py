"""
=========================================================
Payment Schemas
Hotel Room Booking System
=========================================================
"""

from datetime import datetime
from pydantic import BaseModel, Field


# =========================================================
# Request Schema
# =========================================================

class PaymentCreate(BaseModel):

    reservation_id: int = Field(..., gt=0)
    payment_method: str = Field(..., min_length=2)


# =========================================================
# Response Schema
# =========================================================

class PaymentResponse(BaseModel):

    id: int
    reservation_id: int
    amount: float
    payment_method: str
    payment_status: str
    transaction_id: str
    created_at: datetime

    model_config = {"from_attributes": True}


# =========================================================
# Payment History
# =========================================================

class PaymentHistory(BaseModel):

    id: int
    reservation_id: int
    amount: float
    payment_status: str
    payment_method: str
    created_at: datetime

    model_config = {"from_attributes": True}


# =========================================================
# Success Response
# =========================================================

class PaymentSuccessResponse(BaseModel):

    message: str
    payment: PaymentResponse