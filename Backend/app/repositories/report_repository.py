from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.customer import Customer
from app.models.room import Room
from app.models.reservation import Reservation
from app.models.payment import Payment
from app.constants.booking_constants import BookingStatus


def get_dashboard_statistics(db: Session):
    """
    Fetch dashboard statistics for the admin reports page.
    """

    total_customers = (
        db.query(func.count(Customer.id)).scalar() or 0
    )

    total_rooms = (
        db.query(func.count(Room.id)).scalar() or 0
    )

    total_bookings = (
        db.query(func.count(Reservation.id)).scalar() or 0
    )

    total_revenue = (
        db.query(func.coalesce(func.sum(Payment.total_amount), 0))
        .scalar()
        or 0
    )

    successful_payments = (
        db.query(func.count(Payment.id))
        .filter(Payment.payment_status == "SUCCESS")
        .scalar()
        or 0
    )

    cancelled_bookings = (
        db.query(func.count(Reservation.id))
        .filter(Reservation.status == BookingStatus.CANCELLED)
        .scalar()
        or 0
    )

    return {
        "total_customers": total_customers,
        "total_rooms": total_rooms,
        "total_bookings": total_bookings,
        "total_revenue": float(total_revenue),
        "successful_payments": successful_payments,
        "cancelled_bookings": cancelled_bookings,
    }