"""
=========================================================
Booking Constants
Hotel Room Booking System
=========================================================
"""

import enum


# ==========================================================
# Booking Status
# ==========================================================

class BookingStatus(str, enum.Enum):
    PENDING   = "PENDING"
    BOOKED    = "BOOKED"
    CANCELLED = "CANCELLED"
    EXPIRED   = "EXPIRED"