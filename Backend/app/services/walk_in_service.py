from datetime import date
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.constants.booking_constants import BookingStatus
from app.models.customer import Customer
from app.models.payment import Payment
from app.models.reservation import Reservation
from app.models.room import Room
from app.schemas.walk_in_schema import WalkInCustomerCreate
from app.utils.password_hash import hash_password


def _calculate_days(check_in: date, check_out: date) -> int:
    days = (check_out - check_in).days
    if days <= 0:
        raise HTTPException(status_code=400, detail="Check-out date must be later than check-in date.")
    return days


def _find_or_create_customer(db: Session, payload: WalkInCustomerCreate) -> Customer:
    customer = None
    if payload.mobile_number:
        customer = db.query(Customer).filter(Customer.phone == payload.mobile_number).first()
    if not customer and payload.email:
        customer = db.query(Customer).filter(Customer.email == payload.email).first()

    if customer:
        customer.name = payload.full_name or customer.name
        customer.email = payload.email or customer.email
        customer.phone = payload.mobile_number or customer.phone
        customer.role = "customer"
        db.commit()
        db.refresh(customer)
        return customer

    customer = Customer(
        name=payload.full_name,
        email=payload.email or f"walkin-{payload.mobile_number}@local.hotel",
        phone=payload.mobile_number,
        password=hash_password("walkin123"),
        role="customer",
        is_verified=True,
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer


def create_walk_in_booking(payload: WalkInCustomerCreate, db: Session):
    room = db.query(Room).filter(Room.id == payload.room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found.")
    if not room.is_available:
        raise HTTPException(status_code=400, detail="Room is not available.")
    if payload.guests > room.capacity:
        raise HTTPException(status_code=400, detail="Guest count exceeds room capacity.")

    existing = db.query(Reservation).filter(
        Reservation.room_id == room.id,
        Reservation.status.in_([
            BookingStatus.PENDING_PAYMENT,
            BookingStatus.CONFIRMED,
            BookingStatus.CHECKED_IN,
        ])
    ).all()

    for booking in existing:
        if payload.check_in < booking.check_out and payload.check_out > booking.check_in:
            raise HTTPException(status_code=400, detail="Room already booked for the selected dates.")

    customer = _find_or_create_customer(db, payload)
    days = _calculate_days(payload.check_in, payload.check_out)

    base_amount = room.price * days
    tax = round(base_amount * 0.18, 2)
    discount = round(payload.discount, 2)
    total_amount = round(base_amount + tax - discount, 2)

    booking_reference = f"WALK-{room.id}-{days}-{customer.id}"
    reservation = Reservation(
        customer_id=customer.id,
        customer_name=customer.name,
        room_id=room.id,
        check_in=payload.check_in,
        check_out=payload.check_out,
        guests=payload.guests,
        total_price=total_amount,
        status=BookingStatus.CONFIRMED,
    )
    db.add(reservation)
    db.commit()
    db.refresh(reservation)

    payment = Payment(
        reservation_id=reservation.id,
        customer_id=customer.id,
        amount=base_amount,
        discount=discount,
        tax=tax,
        total_amount=total_amount,
        payment_method=payload.payment_method,
        payment_status="PAID",
        transaction_id=f"WALK-{reservation.id}",
    )
    db.add(payment)
    db.commit()

    return {
        "id": reservation.id,
        "customer_id": customer.id,
        "customer_name": customer.name,
        "room_id": room.id,
        "room_number": room.room_number,
        "room_type": room.room_type,
        "check_in": reservation.check_in,
        "check_out": reservation.check_out,
        "guests": reservation.guests,
        "total_price": reservation.total_price,
        "tax": tax,
        "discount": discount,
        "status": reservation.status.value if hasattr(reservation.status, 'value') else str(reservation.status),
        "payment_status": "PAID",
        "payment_method": payload.payment_method,
        "special_requests": payload.special_requests,
        "booking_reference": booking_reference,
    }


def get_walk_in_bookings(db: Session):
    reservations = db.query(Reservation).order_by(Reservation.created_at.desc()).all()
    result = []
    for reservation in reservations:
        customer = db.query(Customer).filter(Customer.id == reservation.customer_id).first()
        room = db.query(Room).filter(Room.id == reservation.room_id).first()
        payment = db.query(Payment).filter(Payment.reservation_id == reservation.id).order_by(Payment.created_at.desc()).first()
        result.append({
            "id": reservation.id,
            "customer_name": reservation.customer_name,
            "room_number": room.room_number if room else None,
            "check_in": reservation.check_in,
            "check_out": reservation.check_out,
            "guests": reservation.guests,
            "total_price": reservation.total_price,
            "status": reservation.status.value if hasattr(reservation.status, 'value') else str(reservation.status),
            "payment_status": payment.payment_status if payment else "PENDING",
            "booking_reference": f"WALK-{reservation.id}",
        })
    return result


def get_available_rooms(db: Session, check_in: date | None = None, check_out: date | None = None, guests: int | None = None):
    query = db.query(Room).filter(Room.is_available.is_(True))
    if guests is not None:
        query = query.filter(Room.capacity >= guests)
    rooms = query.all()
    if not check_in or not check_out:
        return rooms

    available = []
    for room in rooms:
        overlapping = db.query(Reservation).filter(
            Reservation.room_id == room.id,
            Reservation.status.in_([
                BookingStatus.PENDING_PAYMENT,
                BookingStatus.CONFIRMED,
                BookingStatus.CHECKED_IN,
            ])
        ).all()
        conflict = False
        for booking in overlapping:
            if check_in < booking.check_out and check_out > booking.check_in:
                conflict = True
                break
        if not conflict:
            available.append(room)
    return available
