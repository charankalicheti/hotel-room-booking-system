from sqlalchemy.orm import Session
from app.repositories.customer_repository import get_all_customers


def get_customers(db: Session):
    return get_all_customers(db)