"""
=========================================================
Payment Repository
Hotel Room Booking System
=========================================================
"""

from sqlalchemy.orm import Session

from app.models.payment import Payment


# ==========================================================
# Create Payment
# ==========================================================

def create_payment(
    payment: Payment,
    db: Session,
) -> Payment:

    db.add(payment)

    db.commit()

    db.refresh(payment)

    return payment


# ==========================================================
# Update Payment
# ==========================================================

def update_payment(
    payment: Payment,
    db: Session,
) -> Payment:

    db.commit()

    db.refresh(payment)

    return payment


# ==========================================================
# Get Payment By Reservation
# ==========================================================

def get_payment_by_reservation(
    reservation_id: int,
    db: Session,
) -> Payment | None:

    return (
        db.query(Payment)
        .filter(
            Payment.reservation_id == reservation_id
        )
        .first()
    )


# ==========================================================
# Get Payment By Payment Id
# ==========================================================

def get_payment_by_id(
    payment_id: int,
    db: Session,
) -> Payment | None:

    return (
        db.query(Payment)
        .filter(
            Payment.id == payment_id
        )
        .first()
    )


# ==========================================================
# Get Payment By Transaction Id
# ==========================================================

def get_payment_by_transaction(
    transaction_id: str,
    db: Session,
) -> Payment | None:

    return (
        db.query(Payment)
        .filter(
            Payment.transaction_id == transaction_id
        )
        .first()
    )


# ==========================================================
# Get Payment By Gateway Order
# ==========================================================

def get_payment_by_gateway_order(
    gateway_order_id: str,
    db: Session,
) -> Payment | None:

    return (
        db.query(Payment)
        .filter(
            Payment.gateway_order_id == gateway_order_id
        )
        .first()
    )


# ==========================================================
# Customer Payment History
# ==========================================================

def get_customer_payments(
    customer_id: int,
    db: Session,
):

    return (
        db.query(Payment)
        .filter(
            Payment.customer_id == customer_id
        )
        .order_by(
            Payment.created_at.desc()
        )
        .all()
    )


# ==========================================================
# Admin Payment History
# ==========================================================

def get_all_payments(
    db: Session,
):

    return (
        db.query(Payment)
        .order_by(
            Payment.created_at.desc()
        )
        .all()
    )


# ==========================================================
# Delete Payment
# ==========================================================

def delete_payment(
    payment: Payment,
    db: Session,
):

    db.delete(payment)

    db.commit()