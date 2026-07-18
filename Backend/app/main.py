from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import report

from app.database import Base, engine

# ==========================================================
# Models
# ==========================================================
from app.models.admin import Admin
from app.models.customer import Customer
from app.models.room import Room
from app.models.reservation import Reservation
from app.models.payment import Payment

# ==========================================================
# Create Database Tables
# ==========================================================
Base.metadata.create_all(bind=engine)

# ==========================================================
# FastAPI App
# ==========================================================
app = FastAPI(
    title="Hotel Room Booking System API",
    description="Backend API for Hotel Room Booking System",
    version="1.0.0",
)

# ==========================================================
# CORS
# ==========================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ==========================================================
# Routers
# ==========================================================
from app.routers import (
    auth,
    admin,
    rooms,
    bookings,
    payments,
    receptionist,
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(rooms.router)
app.include_router(bookings.router)
app.include_router(payments.router)
app.include_router(receptionist.router)
app.include_router(report.router)

# ==========================================================
# Root Endpoint
# ==========================================================
@app.get("/", tags=["Root"])
def root():
    return {
        "success": True,
        "message": "Hotel Room Booking System API is Running 🚀",
        "version": "1.0.0",
        "documentation": "/docs",
    }

# ==========================================================
# Health Check
# ==========================================================
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "UP",
        "database": "Connected",
        "application": "Running",
    }