"""
=========================================================
Booking Constants
Hotel Room Booking System
=========================================================
"""

import enum


class BookingStatus(str, enum.Enum):

    # Customer created booking
    PENDING_PAYMENT = "PENDING_PAYMENT"

    # Payment successful
    CONFIRMED = "CONFIRMED"

    # Customer reached hotel
    CHECKED_IN = "CHECKED_IN"

    # Customer completed stay
    CHECKED_OUT = "CHECKED_OUT"

    # Customer cancelled
    CANCELLED = "CANCELLED"

    # Payment refunded
    REFUNDED = "REFUNDED"