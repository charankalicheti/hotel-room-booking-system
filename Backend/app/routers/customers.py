from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import admin_required
from app.services.customer_service import get_customers
from app.models.admin import Admin

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)


@router.get("")
def list_customers(
    db: Session = Depends(get_db),
    admin: Admin = Depends(admin_required),
):
    return get_customers(db)