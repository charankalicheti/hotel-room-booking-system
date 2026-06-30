"""
=========================================================
Booking Custom Exceptions
Hotel Room Booking System
=========================================================
"""

from fastapi import HTTPException, status


# ==========================================================
# Customer Not Found
# ==========================================================

class CustomerNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found."
        )


# ==========================================================
# Room Not Found
# ==========================================================

class RoomNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found."
        )


# ==========================================================
# Booking Not Found
# ==========================================================

class BookingNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found."
        )


# ==========================================================
# Room Already Booked
# ==========================================================

class RoomUnavailableException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room is already booked for the selected dates."
        )


# ==========================================================
# Invalid Booking Dates
# ==========================================================

class InvalidBookingDateException(HTTPException):
    def __init__(self, detail: str = "Invalid booking dates."):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )


# ==========================================================
# Booking Already Cancelled
# ==========================================================

class BookingAlreadyCancelledException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking has already been cancelled."
        )
