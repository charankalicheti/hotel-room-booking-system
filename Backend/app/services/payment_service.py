"""
=========================================================
Payment Service
Hotel Room Booking System
=========================================================
"""

import base64
import hashlib
import hmac
import json
import uuid
from datetime import datetime
from typing import Any
from urllib import error, request

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.config import settings
from app.constants.booking_constants import BookingStatus
from app.models.customer import Customer
from app.models.payment import Payment
from app.models.reservation import Reservation
from app.repositories.payment_repository import (
    create_payment as save_payment,
    get_all_payments,
    get_customer_payments,
    get_payment_by_id,
    get_payment_by_reservation as repo_get_payment_by_reservation,
    update_payment,
)
from app.schemas.payment_schema import CreatePaymentRequest, VerifyPaymentRequest


# ==========================================================
# TAX
# ==========================================================

GST_PERCENTAGE = 18


# ==========================================================
# Calculate GST
# ==========================================================

def calculate_tax(
    amount: float,
) -> float:

    return round(
        amount * GST_PERCENTAGE / 100,
        2,
    )


# ==========================================================
# Calculate Discount
# ==========================================================

def calculate_discount(
    amount: float,
) -> float:

    # Future coupon support

    return 0.0


# ==========================================================
# Generate Transaction ID
# ==========================================================

def generate_transaction_id() -> str:
    return str(uuid.uuid4())


# ==========================================================
# Generate Razorpay Signature
# ==========================================================

def generate_razorpay_signature(order_id: str, payment_id: str, secret: str) -> str:
    body = f"{order_id}|{payment_id}".encode("utf-8")
    return hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()


# ==========================================================
# Create Razorpay Order
# ==========================================================

def _create_razorpay_order(total_amount: float, receipt: str) -> dict[str, Any]:
    key_id = (settings.RAZORPAY_KEY_ID or "").strip()
    key_secret = (settings.RAZORPAY_KEY_SECRET or "").strip()

    if not key_id or not key_secret:
        return {
            "id": f"test-order-{receipt}",
            "amount": int(round(total_amount * 100)),
            "currency": "INR",
            "status": "created",
            "test_mode": True,
        }

    payload = json.dumps({
        "amount": int(round(total_amount * 100)),
        "currency": "INR",
        "receipt": receipt,
    }).encode("utf-8")

    auth_header = base64.b64encode(f"{key_id}:{key_secret}".encode("utf-8")).decode("utf-8")
    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/json",
    }

    req = request.Request(
        "https://api.razorpay.com/v1/orders",
        data=payload,
        headers=headers,
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8")
        raise HTTPException(status_code=502, detail=f"Razorpay order creation failed: {body}") from exc
    except error.URLError as exc:
        raise HTTPException(status_code=502, detail="Unable to reach Razorpay at the moment.") from exc


# ==========================================================
# Create Payment
# ==========================================================

def create_payment(request: CreatePaymentRequest, customer: Customer, db: Session):
    reservation = (
        db.query(Reservation)
        .filter(
            Reservation.id == request.reservation_id,
            Reservation.customer_id == customer.id,
        )
        .first()
    )

    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found.")

    if reservation.status == BookingStatus.CONFIRMED:
        raise HTTPException(status_code=400, detail="Payment already completed.")

    amount = float(reservation.total_price or 0)
    discount = calculate_discount(amount)
    tax = calculate_tax(amount)
    total_amount = round(amount + tax - discount, 2)

    gateway_order = _create_razorpay_order(total_amount, f"reservation-{reservation.id}")

    payment = Payment(
        reservation_id=reservation.id,
        customer_id=customer.id,
        amount=amount,
        discount=discount,
        tax=tax,
        total_amount=total_amount,
        currency="INR",
        payment_method=request.payment_method or "RAZORPAY",
        gateway="RAZORPAY",
        payment_status="PENDING",
        gateway_order_id=gateway_order.get("id"),
        transaction_id=None,
        paid_at=None,
    )

    payment = save_payment(payment, db)

    return {
        "reservation_id": reservation.id,
        "payment_id": payment.id,
        "order_id": payment.gateway_order_id,
        "amount": int(gateway_order.get("amount", int(round(total_amount * 100)))),
        "currency": gateway_order.get("currency", "INR"),
        "key": settings.RAZORPAY_KEY_ID or "test_key",
        "payment_status": payment.payment_status,
        "test_mode": bool(not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET),
    }


# ==========================================================
# Verify Payment
# ==========================================================

def verify_payment(request: VerifyPaymentRequest, customer: Customer, db: Session):
    reservation = (
        db.query(Reservation)
        .filter(
            Reservation.id == request.reservation_id,
            Reservation.customer_id == customer.id,
        )
        .first()
    )

    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found.")

    payment = repo_get_payment_by_reservation(request.reservation_id, db)
    if payment is None:
        raise HTTPException(status_code=404, detail="Payment not found.")

    expected_signature = generate_razorpay_signature(
        request.razorpay_order_id,
        request.razorpay_payment_id,
        settings.RAZORPAY_KEY_SECRET,
    )

    if not hmac.compare_digest(expected_signature, request.razorpay_signature):
        raise HTTPException(status_code=400, detail="Invalid Razorpay signature.")

    payment.payment_status = "SUCCESS"
    payment.gateway_payment_id = request.razorpay_payment_id
    payment.gateway_signature = request.razorpay_signature
    payment.transaction_id = request.razorpay_payment_id
    payment.paid_at = datetime.utcnow()

    reservation.status = BookingStatus.CONFIRMED

    update_payment(payment, db)
    db.commit()
    db.refresh(reservation)

    return payment


# ==========================================================
# Repository Imports
# ==========================================================

from app.repositories.payment_repository import (
    get_payment_by_reservation as repo_get_payment_by_reservation,
    get_customer_payments,
    get_all_payments,
)


# ==========================================================
# Get Payment By Reservation
# ==========================================================

def get_payment_by_reservation(

    reservation_id: int,

    customer: Customer,

    db: Session,

):

    reservation = (

        db.query(Reservation)

        .filter(

            Reservation.id == reservation_id,

            Reservation.customer_id == customer.id,

        )

        .first()

    )

    if reservation is None:

        raise HTTPException(

            status_code=404,

            detail="Reservation not found."

        )

    payment = repo_get_payment_by_reservation(

        reservation_id,

        db,

    )

    if payment is None:

        raise HTTPException(

            status_code=404,

            detail="Payment not found."

        )

    return payment


# ==========================================================
# Customer Payment History
# ==========================================================

def get_payment_history(

    customer: Customer,

    db: Session,

):

    payments = get_customer_payments(

        customer.id,

        db,

    )

    return payments


# ==========================================================
# Admin Payment History
# ==========================================================

def get_all_payment_history(

    db: Session,

):

    return get_all_payments(db)


# ==========================================================
# Check Payment Exists
# ==========================================================

def payment_exists(

    reservation_id: int,

    db: Session,

):

    payment = repo_get_payment_by_reservation(

        reservation_id,

        db,

    )

    return payment is not None

# ==========================================================
# Invoice Details
# ==========================================================

def get_invoice(

    reservation_id: int,

    customer: Customer,

    db: Session,

):

    reservation = (

        db.query(Reservation)

        .filter(

            Reservation.id == reservation_id,

            Reservation.customer_id == customer.id,

        )

        .first()

    )

    if reservation is None:

        raise HTTPException(

            status_code=404,

            detail="Reservation not found."

        )

    payment = repo_get_payment_by_reservation(

        reservation_id,

        db,

    )

    if payment is None:

        raise HTTPException(

            status_code=404,

            detail="Payment not found."

        )

    return {

        "reservation_id": reservation.id,

        "customer_name": reservation.customer_name,

        "room_number": reservation.room_id,

        "amount": payment.amount,

        "tax": payment.tax,

        "discount": payment.discount,

        "total_amount": payment.total_amount,

        "payment_status": payment.payment_status,

        "transaction_id": payment.transaction_id,

        "payment_date": payment.paid_at,

    }


# ==========================================================
# Payment Dashboard Summary
# ==========================================================

def payment_dashboard_summary(

    db: Session,

):

    payments = get_all_payments(db)

    total_transactions = len(payments)

    successful = 0

    pending = 0

    failed = 0

    revenue = 0

    for payment in payments:

        if payment.payment_status == "SUCCESS":

            successful += 1

            revenue += payment.total_amount

        elif payment.payment_status == "PENDING":

            pending += 1

        elif payment.payment_status == "FAILED":

            failed += 1

    return {

        "total_transactions": total_transactions,

        "successful_payments": successful,

        "pending_payments": pending,

        "failed_payments": failed,

        "total_revenue": revenue,

    }


# ==========================================================
# Refund Payment (Future Ready)
# ==========================================================

def refund_payment(

    payment_id: int,

    db: Session,

):

    payment = get_payment_by_id(

        payment_id,

        db,

    )

    if payment is None:

        raise HTTPException(

            status_code=404,

            detail="Payment not found."

        )

    payment.payment_status = "REFUNDED"

    update_payment(

        payment,

        db,

    )

    reservation = (

        db.query(Reservation)

        .filter(

            Reservation.id == payment.reservation_id

        )

        .first()

    )

    if reservation:

        reservation.status = BookingStatus.REFUNDED

        db.commit()

        db.refresh(reservation)

    return {

        "success": True,

        "message": "Payment refunded successfully."

    }