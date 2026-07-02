"""
=========================================================
Payment Constants
=========================================================
"""

from enum import Enum


class PaymentStatus(str, Enum):
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    PENDING = "PENDING"