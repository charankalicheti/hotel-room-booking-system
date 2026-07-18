from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.schemas.auth_schema import (
    RegisterRequest,
    VerifyOTPRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    TokenResponse,
    SendOTPRequest,
)

from app.services.auth_service import (
    register_user,
    verify_otp_service,
    login_user,
    forgot_password,
    reset_password,
    get_profile,
    send_otp_service,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

# ==========================================================
# Register
# ==========================================================

@router.post("/register")
async def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):
    return await register_user(
        request,
        db,
    )


# ==========================================================
# Send OTP (Resend OTP)
# ==========================================================

@router.post("/send-otp")
async def send_otp(
    request: SendOTPRequest,
    db: Session = Depends(get_db),
):
    return await send_otp_service(
        request,
        db,
    )


# ==========================================================
# Verify OTP
# ==========================================================

@router.post(
    "/verify-otp",
    response_model=TokenResponse,
)
def verify_otp(
    request: VerifyOTPRequest,
    db: Session = Depends(get_db),
):
    return verify_otp_service(
        request,
        db,
    )


# ==========================================================
# Login
# ==========================================================

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return login_user(
        form_data,
        db,
    )


# ==========================================================
# Profile
# ==========================================================

@router.get("/profile")
def profile(
    current_user=Depends(get_current_user),
):
    return get_profile(
        current_user,
    )


# ==========================================================
# Forgot Password
# ==========================================================

@router.post("/forgot-password")
async def forgot_password_route(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    return await forgot_password(
        request,
        db,
    )


# ==========================================================
# Reset Password
# ==========================================================

@router.post("/reset-password")
def reset_password_route(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    return reset_password(
        request,
        db,
    )