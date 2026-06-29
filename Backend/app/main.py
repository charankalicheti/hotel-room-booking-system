from fastapi import FastAPI

app = FastAPI(title="Hotel Room Booking System")

@app.get("/")
def root():
    return {"message": "Hotel Room Booking System API running"}