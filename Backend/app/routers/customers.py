"""
=========================================================
Customers Router
Hotel Room Booking System
=========================================================
"""

from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import admin_required

from app.services.auth_service import (
    get_all_customers,
    delete_customer,
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)


# ==========================================================
# Get All Customers
# ==========================================================

@router.get("/")
def customers(

    db: Session = Depends(get_db),

    current_admin=Depends(admin_required),

):

    return get_all_customers(db)


# ==========================================================
# Delete Customer
# ==========================================================

@router.delete("/{customer_id}")
def remove_customer(

    customer_id: int,

    db: Session = Depends(get_db),

    current_admin=Depends(admin_required),

):

    return delete_customer(

        customer_id,

        db,

    )