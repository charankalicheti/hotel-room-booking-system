from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# ==========================================================
# Member 1 Models
# ==========================================================
from app.models.admin import Admin
from app.models.customer import Customer
from app.models.room import Room
from app.models.hotel import Hotel

# ==========================================================
# Member 2 Models
# ==========================================================
from app.models.reservation import Reservation

# ==========================================================
# Member 3 Models
# ==========================================================
from app.models.payment import Payment

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hotel Room Booking System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# Member 1 Routers
# ==========================================================
from app.routers import auth, admin, customers, hotel

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(customers.router)
app.include_router(hotel.router)
# ==========================================================
# Member 2 Routers
# ==========================================================
from app.routers import bookings

app.include_router(bookings.router)

# ==========================================================
# Member 3 Routers
# ==========================================================
from app.routers import payments, receptionist

app.include_router(payments.router)
app.include_router(receptionist.router)


@app.get("/")
def root():
    return {
        "message": "Hotel Room Booking System API is running"
    }