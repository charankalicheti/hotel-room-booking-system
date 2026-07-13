from sqlalchemy.orm import Session
from app.models.customer import Customer


def get_all_customers(db: Session):
    return (
        db.query(Customer)
        .order_by(Customer.created_at.desc())
        .all()
    )