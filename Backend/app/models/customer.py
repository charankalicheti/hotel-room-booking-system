from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)   # <-- Added
    password = Column(String(255), nullable=False)
    role = Column(String(20), default="customer")  # admin/customer
    created_at = Column(DateTime(timezone=True), server_default=func.now())