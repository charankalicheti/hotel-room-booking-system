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
    BOOKED    = "BOOKED"
    CANCELLED = "CANCELLED"
