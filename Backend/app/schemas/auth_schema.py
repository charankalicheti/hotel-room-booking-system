from pydantic import (
    BaseModel,
    EmailStr,
    field_validator,
    model_validator,
)
from pydantic import EmailStr

import re


# ==========================================================
# Register Request
# ==========================================================

class RegisterRequest(BaseModel):

    name: str
    email: EmailStr
    phone: str
    password: str
    confirm_password: str
    role: str = "customer"

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):

        if len(value.strip()) < 3:
            raise ValueError(
                "Name must contain at least 3 characters."
            )

        if not re.fullmatch(r"[A-Za-z ]+", value):
            raise ValueError(
                "Name should contain only alphabets."
            )

        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):

        if not re.fullmatch(r"[6-9]\d{9}", value):
            raise ValueError(
                "Enter valid 10 digit mobile number."
            )

        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if len(value) < 8:
            raise ValueError(
                "Password must contain minimum 8 characters."
            )

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain one uppercase letter."
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain one lowercase letter."
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain one number."
            )

        if not re.search(
            r"[!@#$%^&*(),.?\":{}|<>]",
            value,
        ):
            raise ValueError(
                "Password must contain one special character."
            )

        return value

    @model_validator(mode="after")
    def validate_confirm_password(self):

        if self.password != self.confirm_password:

            raise ValueError(
                "Password and Confirm Password do not match."
            )

        return self



# ==========================================================
# Send OTP
# ==========================================================



class SendOTPRequest(BaseModel):

    email: EmailStr


# ==========================================================
# Verify OTP
# ==========================================================

class VerifyOTPRequest(BaseModel):

    email: EmailStr
    otp: str


# ==========================================================
# Complete Registration
# ==========================================================

class CompleteRegistrationRequest(RegisterRequest):
    pass


# ==========================================================
# Login
# ==========================================================

class LoginRequest(BaseModel):

    email: EmailStr
    password: str


# ==========================================================
# Forgot Password
# ==========================================================

class ForgotPasswordRequest(BaseModel):

    email: EmailStr


# ==========================================================
# Reset Password
# ==========================================================

class ResetPasswordRequest(BaseModel):

    email: EmailStr
    otp: str
    phone: str
    new_password: str
    confirm_password: str

    @model_validator(mode="after")
    def passwords_match(self):

        if self.new_password != self.confirm_password:

            raise ValueError(
                "Passwords do not match."
            )

        return self


# ==========================================================
# Customer Response
# ==========================================================

class CustomerResponse(BaseModel):

    id: int
    name: str
    email: EmailStr
    phone: str
    role: str

    model_config = {
        "from_attributes": True
    }


# ==========================================================
# Token Response
# ==========================================================

class TokenResponse(BaseModel):

    access_token: str
    token_type: str
    role: str   