import os

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
os.environ.setdefault("SECRET_KEY", "test-secret")

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base
from app.models.admin import Admin
from app.models.customer import Customer
from app.schemas.auth_schema import RegisterRequest
from app.services.auth_service import register_user


def _create_test_session():
    engine = create_engine("sqlite:///:memory:")
    TestingSessionLocal = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestingSessionLocal()


def test_register_customer_stores_in_customers_table():
    db = _create_test_session()

    user = register_user(
        RegisterRequest(
            name="Jane Doe",
            email="jane@example.com",
            phone="1234567890",
            password="secret123",
            role="customer",
        ),
        db,
    )

    assert isinstance(user, Customer)
    assert db.query(Customer).count() == 1
    assert db.query(Admin).count() == 0


def test_register_admin_stores_in_admins_table():
    db = _create_test_session()

    user = register_user(
        RegisterRequest(
            name="Admin User",
            email="admin@example.com",
            phone="0987654321",
            password="secret123",
            role="admin",
        ),
        db,
    )

    assert isinstance(user, Admin)
    assert db.query(Admin).count() == 1
    assert db.query(Customer).count() == 0
