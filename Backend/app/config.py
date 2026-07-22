from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # ==================================================
    # Database
    # ==================================================
    DATABASE_URL: str

    # ==================================================
    # JWT
    # ==================================================
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ==================================================
    # Email SMTP
    # ==================================================
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_SERVER: str
    MAIL_PORT: int


    # ==================================================
    # Razorpay
    # ==================================================
    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str

    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parent.parent / ".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()