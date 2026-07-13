"""
=========================================================
Payments Router
Hotel Room Booking System
=========================================================
"""

from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payment_schema import (
    PaymentCreate,
    PaymentResponse,
    PaymentSuccessResponse,
)

from app.services.payment_service import (
    make_payment,
    get_payment,
    get_all_payments as get_all_payments_service,
)


router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


# ==========================================================
# POST /payments
# ==========================================================

@router.post(
    "",
    response_model=PaymentSuccessResponse,
    status_code=201,
    summary="Make Payment",
)
def create_payment(
    request: PaymentCreate,
    db: Session = Depends(get_db),
):

    payment = make_payment(
        request,
        db,
    )

    return PaymentSuccessResponse(
        message="Payment completed successfully.",
        payment=payment,
    )


# ==========================================================
# GET /payments
# Admin - View All Payments
# ==========================================================

@router.get(
    "",
    summary="Get All Payments (Admin)",
)
def get_all_payments(
    db: Session = Depends(get_db),
):
    return get_all_payments_service(db)


# ==========================================================
# GET /payments/{reservation_id}
# ==========================================================

@router.get(
    "/{reservation_id}",
    response_model=PaymentResponse,
    summary="Get Payment Details",
)
def payment_details(
    reservation_id: int,
    db: Session = Depends(get_db),
):

    return get_payment(
        reservation_id,
        db,
    )