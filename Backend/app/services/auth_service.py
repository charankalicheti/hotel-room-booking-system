from datetime import datetime, timedelta
import random

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.reservation import Reservation
from app.models.admin import Admin

from app.schemas.auth_schema import (
    RegisterRequest,
    CompleteRegistrationRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    SendOTPRequest,
    VerifyOTPRequest,
)

from app.utils.password_hash import (
    hash_password,
    verify_password,
)

from app.utils.jwt_handler import (
    create_access_token,
)

from app.utils.email_service import (
    send_verification_email,
)

# ==========================================================
# Temporary Storage
# ==========================================================

OTP_EXPIRY_MINUTES = 5

otp_storage = {}

pending_registrations = {}

# ==========================================================
# Helper Methods
# ==========================================================

def get_customer_by_email(
    db: Session,
    email: str,
):
    return (
        db.query(Customer)
        .filter(Customer.email == email)
        .first()
    )


def get_customer_by_phone(
    db: Session,
    phone: str,
):
    return (
        db.query(Customer)
        .filter(Customer.phone == phone)
        .first()
    )


def get_admin_by_email(
    db: Session,
    email: str,
):
    return (
        db.query(Admin)
        .filter(Admin.email == email)
        .first()
    )


def get_user(
    db: Session,
    email: str,
):
    customer = get_customer_by_email(
        db,
        email,
    )

    if customer:
        return customer

    admin = get_admin_by_email(
        db,
        email,
    )

    return admin

# ==========================================================
# OTP Helpers
# ==========================================================

def generate_otp():
    return str(random.randint(100000, 999999))


def otp_expiry():
    return datetime.utcnow() + timedelta(
        minutes=OTP_EXPIRY_MINUTES
    )


def is_otp_expired(expiry):
    return datetime.utcnow() > expiry

# ==========================================================
# Register Customer
# ==========================================================

async def register_user(
    request: RegisterRequest,
    db: Session,
):
    existing_user = get_user(
        db,
        request.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    existing_phone = get_customer_by_phone(
        db,
        request.phone,
    )

    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered."
        )

    hashed_password = hash_password(
        request.password
    )

    pending_registrations[
        request.email
    ] = {
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "password": hashed_password,
        "role": request.role,
    }

    otp = generate_otp()

    otp_storage[
        request.email
    ] = {
        "otp": otp,
        "expires_at": otp_expiry(),
    }

    try:
        await send_verification_email(
            request.email,
            otp,
        )
        print("✅ OTP email sent successfully")
    except Exception as e:
        print("❌ Email sending failed:", e)
        raise HTTPException(
            status_code=500,
            detail=f"Email sending failed: {str(e)}"
        )

    return {
        "success": True,
        "message": "OTP sent successfully. Please verify your email."
    }

# ==========================================================
# Send OTP Again
# ==========================================================

async def send_otp_service(
    request: SendOTPRequest,
    db: Session,
):
    if request.email not in pending_registrations:
        raise HTTPException(
            status_code=404,
            detail="No pending registration found."
        )

    otp = generate_otp()

    otp_storage[
        request.email
    ] = {
        "otp": otp,
        "expires_at": otp_expiry(),
    }

    await send_verification_email(
        request.email,
        otp,
    )

    return {
        "success": True,
        "message": "OTP resent successfully."
    }
    # ==========================================================
# Verify OTP
# ==========================================================

def verify_otp_service(
    request: VerifyOTPRequest,
    db: Session,
):
    otp_data = otp_storage.get(request.email)

    if not otp_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP not found."
        )

    if is_otp_expired(otp_data["expires_at"]):
        del otp_storage[request.email]

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired."
        )

    if otp_data["otp"] != request.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP."
        )

    registration = pending_registrations.get(request.email)

    if not registration:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration session expired."
        )

    customer = Customer(
        name=registration["name"],
        email=registration["email"],
        phone=registration["phone"],
        password=registration["password"],
        role=registration["role"],
        is_verified=True,
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    if request.email in otp_storage:
        del otp_storage[request.email]

    if request.email in pending_registrations:
        del pending_registrations[request.email]

    access_token = create_access_token(
        data={
            "user_id": customer.id,
            "email": customer.email,
            "role": customer.role,
            "user_type": customer.role,
        }
    )

    return {
        "success": True,
        "message": "Registration completed successfully.",
        "access_token": access_token,
        "token_type": "bearer",
        "role": customer.role,
    }


# ==========================================================
# Register Admin
# ==========================================================

def register_admin(
    request: RegisterRequest,
    db: Session,
):
    existing_admin = get_user(
        db,
        request.email,
    )

    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists."
        )

    admin = Admin(
        name=request.name,
        email=request.email,
        phone=request.phone,
        password=hash_password(request.password),
        role="admin",
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return admin


# ==========================================================
# Complete Registration
# ==========================================================

def complete_registration(
    request: CompleteRegistrationRequest,
    db: Session,
):
    customer = get_customer_by_email(
        db,
        request.email,
    )

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found."
        )

    return customer
# ==========================================================
# Login
# ==========================================================

def login_user(
    request,
    db: Session,
):
    email = getattr(
        request,
        "email",
        None,
    ) or getattr(
        request,
        "username",
        None,
    )

    user = get_user(
        db,
        email,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not verify_password(
        request.password,
        user.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if isinstance(user, Customer):
        if not user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Please verify your email."
            )

    access_token = create_access_token(
        data={
            "user_id": user.id,
            "email": user.email,
            "role": user.role,
            "user_type": user.role,
        }
    )

    return {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
        },
    }


# ==========================================================
# Customer Profile
# ==========================================================

def get_customer_profile(
    customer: Customer,
):
    return {
        "id": customer.id,
        "name": customer.name,
        "email": customer.email,
        "phone": customer.phone,
        "role": customer.role,
        "is_verified": customer.is_verified,
    }


# ==========================================================
# Admin Profile
# ==========================================================

def get_admin_profile(
    admin: Admin,
):
    return {
        "id": admin.id,
        "name": admin.name,
        "email": admin.email,
        "phone": admin.phone,
        "role": admin.role,
    }


# ==========================================================
# Current Profile
# ==========================================================

def get_profile(
    current_user,
):
    if isinstance(
        current_user,
        Customer,
    ):
        return get_customer_profile(
            current_user
        )

    return get_admin_profile(
        current_user
    )


# ==========================================================
# Logout
# ==========================================================

def logout_user():
    return {
        "success": True,
        "message": "Logged out successfully."
    }
    # ==========================================================
# Forgot Password
# ==========================================================

async def forgot_password(
    request: ForgotPasswordRequest,
    db: Session,
):
    user = get_user(
        db,
        request.email,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found."
        )

    otp = generate_otp()

    otp_storage[request.email] = {
        "otp": otp,
        "expires_at": otp_expiry(),
    }

    await send_verification_email(
        request.email,
        otp,
    )

    return {
        "success": True,
        "message": "Password reset OTP sent successfully."
    }


# ==========================================================
# Reset Password
# ==========================================================

def reset_password(
    request: ResetPasswordRequest,
    db: Session,
):
    customer = get_customer_by_email(
        db,
        request.email,
    )

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found."
        )

    if customer.phone != request.phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number does not match."
        )

    otp_data = otp_storage.get(
        request.email
    )

    if not otp_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP not found."
        )

    if is_otp_expired(
        otp_data["expires_at"]
    ):
        del otp_storage[request.email]

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired."
        )

    if otp_data["otp"] != request.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP."
        )

    if verify_password(
        request.new_password,
        customer.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password cannot be the same as the current password."
        )

    customer.password = hash_password(
        request.new_password
    )

    db.commit()
    db.refresh(customer)

    if request.email in otp_storage:
        del otp_storage[request.email]

    return {
        "success": True,
        "message": "Password updated successfully."
    }


# ==========================================================
# Change Password
# ==========================================================

def change_password(
    current_user,
    old_password: str,
    new_password: str,
    db: Session,
):
    if not verify_password(
        old_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Old password is incorrect."
        )

    if verify_password(
        new_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password cannot be the same as the current password."
        )

    current_user.password = hash_password(
        new_password
    )

    db.commit()
    db.refresh(current_user)

    return {
        "success": True,
        "message": "Password changed successfully."
    }
    # ==========================================================
# Delete Customer
# ==========================================================

def delete_customer(
    customer_id: int,
    db: Session,
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found."
        )

    linked_reservations = (
        db.query(Reservation)
        .filter(Reservation.customer_id == customer_id)
        .all()
    )

    for reservation in linked_reservations:
        db.delete(reservation)

    db.delete(customer)

    try:
        db.commit()
    except Exception as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete customer because related reservations exist."
        ) from exc

    return {
        "success": True,
        "message": "Customer deleted successfully."
    }


# ==========================================================
# Get All Customers
# ==========================================================

def get_all_customers(
    db: Session,
):
    customers = db.query(Customer).all()

    return [
        {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone,
            "role": customer.role,
            "is_verified": customer.is_verified,
        }
        for customer in customers
    ]