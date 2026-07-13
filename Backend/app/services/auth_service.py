from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.admin import Admin
from app.models.customer import Customer
from app.schemas.auth_schema import RegisterRequest
from app.utils.password_hash import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


def _find_user_by_email(db: Session, email: str):
    customer = db.query(Customer).filter(Customer.email == email).first()
    if customer:
        return customer

    return db.query(Admin).filter(Admin.email == email).first()


def register_user(request: RegisterRequest, db: Session):
    existing_user = _find_user_by_email(db, request.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    if request.role not in ["admin", "customer"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be admin or customer"
        )

    if request.role == "admin":
        new_user = Admin(
            name=request.name,
            email=request.email,
            phone=request.phone,
            password=hash_password(request.password),
            role="admin"
        )
    else:
        new_user = Customer(
        name=request.name,
        email=request.email,
        phone=request.phone,
        address=request.address,
        password=hash_password(request.password),
        role="customer"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(request, db: Session):
    user = _find_user_by_email(db, request.username)

    if not user or not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token(
        data={
            "user_id": user.id,
            "email": user.email,
            "role": user.role,
            "user_type": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }