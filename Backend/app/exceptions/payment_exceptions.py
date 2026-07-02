"""
=========================================================
Payment Exceptions
=========================================================
"""

from fastapi import HTTPException


class PaymentNotFoundException(HTTPException):

    def __init__(self):
        super().__init__(
            status_code=404,
            detail="Payment not found."
        )


class PaymentAlreadyExistsException(HTTPException):

    def __init__(self):
        super().__init__(
            status_code=400,
            detail="Payment already completed."
        )