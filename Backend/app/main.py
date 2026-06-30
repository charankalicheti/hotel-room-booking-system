from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Member 1 models
from app.models.admin import Admin
from app.models.customer import Customer
from app.models.room import Room

# Member 2 models
from app.models.reservation import Reservation

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hotel Room Booking System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Member 1 routers
from app.routers import auth, admin
app.include_router(auth.router)
app.include_router(admin.router)

# Member 2 routers
from app.routers import bookings
app.include_router(bookings.router)


@app.get("/")
def root():
    return {"message": "Hotel Room Booking System API is running"}
