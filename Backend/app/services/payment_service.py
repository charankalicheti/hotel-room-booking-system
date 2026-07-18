"""
=========================================================
Payment Service
Hotel Room Booking System
=========================================================
"""

import uuid
from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.payment import Payment
from app.models.reservation import Reservation

from app.constants.booking_constants import BookingStatus

from app.repositories.payment_repository import (
    create_payment as save_payment,
    update_payment,
    get_payment_by_id,
    get_all_payments,
    get_customer_payments,
    get_payment_by_reservation as repo_get_payment_by_reservation,
)
from app.repositories.payment_repository import (
    create_payment as save_payment,
    update_payment,
)

from app.schemas.payment_schema import (
    CreatePaymentRequest,
)


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

def generate_transaction_id():

    return str(uuid.uuid4())


# ==========================================================
# Create Payment
# ==========================================================

def create_payment(

    request: CreatePaymentRequest,

    customer: Customer,

    db: Session,

):

    reservation = (

        db.query(Reservation)

        .filter(

            Reservation.id == request.reservation_id,

            Reservation.customer_id == customer.id,

        )

        .first()

    )

    if reservation is None:

        raise HTTPException(

            status_code=404,

            detail="Reservation not found."

        )

    if reservation.status == BookingStatus.CONFIRMED:

        raise HTTPException(

            status_code=400,

            detail="Payment already completed."

        )

    amount = reservation.total_price

    discount = calculate_discount(amount)

    tax = calculate_tax(amount)

    total_amount = amount + tax - discount

    payment = Payment(

        reservation_id=reservation.id,

        customer_id=customer.id,

        amount=amount,

        discount=discount,

        tax=tax,

        total_amount=total_amount,

        currency="INR",

        payment_method=request.payment_method,

        gateway="SIMULATION",

        payment_status="SUCCESS",

        transaction_id=generate_transaction_id(),

        paid_at=datetime.utcnow(),

    )

    payment = save_payment(

        payment,

        db,

    )

    reservation.status = BookingStatus.CONFIRMED

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