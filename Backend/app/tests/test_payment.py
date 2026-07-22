import hashlib
import hmac
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from app.models.customer import Customer
from app.models.payment import Payment
from app.models.reservation import Reservation
from app.schemas.payment_schema import CreatePaymentRequest
from app.services.payment_service import create_payment, generate_razorpay_signature


def test_generate_razorpay_signature_matches_razorpay_format():
    order_id = "order_123"
    payment_id = "pay_456"
    secret = "test_secret"

    expected = hmac.new(
        secret.encode("utf-8"),
        f"{order_id}|{payment_id}".encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()

    assert generate_razorpay_signature(order_id, payment_id, secret) == expected


def test_create_payment_uses_test_mode_without_razorpay_credentials(monkeypatch):
    class FakeQuery:
        def __init__(self, record):
            self.record = record

        def filter(self, *args, **kwargs):
            return self

        def first(self):
            return self.record

    class FakeDB:
        def query(self, model):
            if model is Reservation:
                return FakeQuery(
                    Reservation(
                        id=7,
                        customer_id=3,
                        total_price=1200,
                        status="PENDING_PAYMENT",
                    )
                )
            if model is Customer:
                return FakeQuery(None)
            raise AssertionError(f"Unexpected model: {model}")

    class FakeSavedPayment(Payment):
        pass

    request = CreatePaymentRequest(reservation_id=7, payment_method="RAZORPAY")
    customer = Customer(id=3)
    db = FakeDB()

    monkeypatch.setattr("app.services.payment_service.settings.RAZORPAY_KEY_ID", "")
    monkeypatch.setattr("app.services.payment_service.settings.RAZORPAY_KEY_SECRET", "")

    def fake_save_payment(payment, db_session):
        payment.id = 42
        return payment

    monkeypatch.setattr("app.services.payment_service.save_payment", fake_save_payment)

    response = create_payment(request, customer, db)

    assert response["test_mode"] is True
    assert response["payment_status"] == "PENDING"
    assert response["order_id"].startswith("test-order-")
