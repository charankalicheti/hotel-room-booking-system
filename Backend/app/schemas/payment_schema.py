from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ==========================================================
# Create Payment Order
# ==========================================================

class CreatePaymentRequest(BaseModel):

    reservation_id: int

    payment_method: str = Field(default="RAZORPAY")


# ==========================================================
# Razorpay Order Response
# ==========================================================

class CreatePaymentResponse(BaseModel):

    reservation_id: int

    payment_id: int

    order_id: str

    amount: int

    currency: str

    key: str

    payment_status: str


# ==========================================================
# Verify Payment
# ==========================================================

class VerifyPaymentRequest(BaseModel):

    reservation_id: int

    razorpay_order_id: str

    razorpay_payment_id: str

    razorpay_signature: str


# ==========================================================
# Payment Response
# ==========================================================

class PaymentResponse(BaseModel):

    id: int

    reservation_id: int

    customer_id: int

    amount: float

    discount: float

    tax: float

    total_amount: float

    currency: str

    payment_method: str

    gateway: str

    payment_status: str

    transaction_id: Optional[str]

    gateway_order_id: Optional[str]

    gateway_payment_id: Optional[str]

    paid_at: Optional[datetime]

    created_at: datetime

    model_config = {
        "from_attributes": True
    }


# ==========================================================
# Payment History
# ==========================================================

class PaymentHistoryResponse(BaseModel):

    id: int

    reservation_id: int

    total_amount: float

    payment_status: str

    payment_method: str

    created_at: datetime

    model_config = {
        "from_attributes": True
    }


# ==========================================================
# Payment Dashboard Response
# ==========================================================

class PaymentDashboardResponse(BaseModel):

    total_transactions: int

    successful_payments: int

    pending_payments: int

    failed_payments: int

    total_revenue: float


# ==========================================================
# Refund Response
# ==========================================================

class RefundResponse(BaseModel):

    success: bool

    message: str


# ==========================================================
# Invoice Response
# ==========================================================

class InvoiceResponse(BaseModel):

    reservation_id: int

    customer_name: str

    room_number: str

    amount: float

    tax: float

    discount: float

    total_amount: float

    payment_status: str

    transaction_id: Optional[str]

    payment_date: Optional[datetime]