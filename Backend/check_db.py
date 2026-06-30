"""
=========================================================
Check Database Data
Run: python check_db.py
=========================================================
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.customer import Customer
from app.models.room import Room
from app.models.reservation import Reservation

db = SessionLocal()

print("\n" + "=" * 60)
print("  DATABASE CHECK")
print("=" * 60)

# ----------------------------------------------------------
# Customers
# ----------------------------------------------------------
print("\n📋 CUSTOMERS TABLE")
print("-" * 60)
customers = db.query(Customer).all()
if customers:
    for c in customers:
        print(f"  ID       : {c.id}")
        print(f"  Name     : {c.name}")
        print(f"  Email    : {c.email}")
        print(f"  Phone    : {c.phone}")
        print(f"  Role     : {c.role}")
        print(f"  Created  : {c.created_at}")
        print("  " + "-" * 40)
else:
    print("  ❌ No customers found")

# ----------------------------------------------------------
# Rooms
# ----------------------------------------------------------
print("\n🛏️  ROOMS TABLE")
print("-" * 60)
rooms = db.query(Room).all()
if rooms:
    for r in rooms:
        print(f"  ID          : {r.id}")
        print(f"  Room Number : {r.room_number}")
        print(f"  Type        : {r.room_type}")
        print(f"  Price       : ₹{r.price}")
        print(f"  Capacity    : {r.capacity}")
        print(f"  Available   : {r.is_available}")
        print(f"  Description : {r.description}")
        print("  " + "-" * 40)
else:
    print("  ❌ No rooms found")

# ----------------------------------------------------------
# Reservations
# ----------------------------------------------------------
print("\n📅 RESERVATIONS TABLE")
print("-" * 60)
reservations = db.query(Reservation).all()
if reservations:
    for res in reservations:
        print(f"  ID           : {res.id}")
        print(f"  Customer ID  : {res.customer_id}")
        print(f"  Room ID      : {res.room_id}")
        print(f"  Check-in     : {res.check_in}")
        print(f"  Check-out    : {res.check_out}")
        print(f"  Guests       : {res.guests}")
        print(f"  Total Price  : ₹{res.total_price}")
        print(f"  Status       : {res.status}")
        print(f"  Created At   : {res.created_at}")
        print(f"  Updated At   : {res.updated_at}")
        print("  " + "-" * 40)
else:
    print("  ❌ No reservations found")

# ----------------------------------------------------------
# Summary
# ----------------------------------------------------------
print("\n" + "=" * 60)
print("  SUMMARY")
print("=" * 60)
print(f"  Total Customers    : {db.query(Customer).count()}")
print(f"  Total Rooms        : {db.query(Room).count()}")
print(f"  Total Reservations : {db.query(Reservation).count()}")
booked    = db.query(Reservation).filter(Reservation.status == "BOOKED").count()
cancelled = db.query(Reservation).filter(Reservation.status == "CANCELLED").count()
print(f"  Booked             : {booked}")
print(f"  Cancelled          : {cancelled}")
print("=" * 60)

db.close()
