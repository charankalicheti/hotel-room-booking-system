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
from app.dependencies import (
    get_current_user,
    admin_required,
)

from app.models.customer import Customer

from app.schemas.payment_schema import (
    CreatePaymentRequest,
    CreatePaymentResponse,
    PaymentResponse,
    PaymentHistoryResponse,
    PaymentDashboardResponse,
    RefundResponse,
    InvoiceResponse,
    VerifyPaymentRequest,
)

from app.services.payment_service import (
    create_payment,
    get_payment_by_reservation,
    get_payment_history,
    get_all_payment_history,
    get_invoice,
    payment_dashboard_summary,
    refund_payment,
    verify_payment,
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


# ==========================================================
# Create Payment
# ==========================================================

@router.post(
    "/create",
    response_model=CreatePaymentResponse,
)
def make_payment(

    request: CreatePaymentRequest,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return create_payment(

        request,

        current_user,

        db,

    )


@router.post(
    "/verify",
    response_model=PaymentResponse,
)
def verify_payment_route(
    request: VerifyPaymentRequest,
    db: Session = Depends(get_db),
    current_user: Customer = Depends(get_current_user),
):
    return verify_payment(
        request,
        current_user,
        db,
    )


# ==========================================================
# Dashboard Summary (Admin)
# ==========================================================

@router.get(
    "/dashboard",
    response_model=PaymentDashboardResponse,
)
def dashboard(

    db: Session = Depends(get_db),

    current_admin=Depends(admin_required),

):

    return payment_dashboard_summary(

        db,

    )


# ==========================================================
# Payment History
# ==========================================================

@router.get(
    "/history",
    response_model=list[PaymentHistoryResponse],
)
def history(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    if getattr(current_user, "role", None) == "admin":
        return get_all_payment_history(db)

    return get_payment_history(

        current_user,

        db,

    )


# ==========================================================
# Payment Details
# ==========================================================

@router.get(
    "/{reservation_id}",
    response_model=PaymentResponse,
)
def payment_details(

    reservation_id: int,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return get_payment_by_reservation(

        reservation_id,

        current_user,

        db,

    )


# ==========================================================
# Invoice
# ==========================================================

@router.get(
    "/invoice/{reservation_id}",
    response_model=InvoiceResponse,
)
def invoice(

    reservation_id: int,

    db: Session = Depends(get_db),

    current_user: Customer = Depends(get_current_user),

):

    return get_invoice(

        reservation_id,

        current_user,

        db,

    )


# ==========================================================
# Refund Payment (Admin)
# ==========================================================

@router.post(
    "/refund/{payment_id}",
    response_model=RefundResponse,
)
def refund(

    payment_id: int,

    db: Session = Depends(get_db),

    current_admin=Depends(admin_required),

):

    return refund_payment(

        payment_id,

        db,

    )