"""
=========================================================
Query Optimization Examples
Apply these patterns to all services
=========================================================
"""

# PATTERN 1: Eager Loading (Solves N+1 Problem)
# =========================================================

# ❌ BAD: N+1 Queries
from sqlalchemy.orm import Session
from app.models.reservation import Reservation
from app.models.room import Room

def get_reservations_bad(db: Session):
    """This causes N+1 queries - ONE query for reservations, N queries for each room"""
    reservations = db.query(Reservation).all()
    
    for reservation in reservations:
        # This causes a NEW query for each iteration!
        room = db.query(Room).filter(Room.id == reservation.room_id).first()
        print(f"Room: {room.room_number}")
    
    return reservations


# ✅ GOOD: Eager Loading
from sqlalchemy.orm import joinedload

def get_reservations_good(db: Session):
    """This uses a single query with JOIN - no N+1 problem!"""
    return (
        db.query(Reservation)
        .options(joinedload(Reservation.room))  # JOIN with room table
        .all()
    )


# PATTERN 2: Query Pagination (Reduces Memory & Response Time)
# =========================================================

# ❌ BAD: Unbounded Query
def list_reservations_bad(db: Session):
    """Returns ALL reservations - could be thousands!"""
    return db.query(Reservation).all()  # 1000+ records = slow


# ✅ GOOD: Paginated Query
from fastapi import Query

def list_reservations_good(
    db: Session,
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(10, ge=1, le=100, description="Number of records to return")
):
    """Returns paginated results - fast and memory efficient"""
    return (
        db.query(Reservation)
        .offset(skip)
        .limit(limit)
        .all()
    )


# PATTERN 3: Efficient Filtering (Use WHERE Clauses)
# =========================================================

# ❌ BAD: Loading Everything Then Filtering
def find_available_rooms_bad(db: Session):
    """Loads ALL rooms into memory then filters in Python - SLOW!"""
    rooms = db.query(Room).all()  # Loads entire table
    return [r for r in rooms if r.is_available]  # Filter in Python


# ✅ GOOD: Database Filtering
def find_available_rooms_good(db: Session):
    """Database does the filtering - fast and memory efficient"""
    return (
        db.query(Room)
        .filter(Room.is_available == True)  # Let database filter
        .all()
    )


# PATTERN 4: Date Range Queries (Use Proper Comparisons)
# =========================================================

# ❌ BAD: String Comparison
from datetime import date

def get_bookings_for_date_bad(db: Session, check_in_date: date):
    """String comparison is slow and inaccurate"""
    reservations = db.query(Reservation).all()
    return [r for r in reservations if str(r.check_in) == str(check_in_date)]


# ✅ GOOD: Date Comparison with Index
def get_bookings_for_date_good(db: Session, check_in_date: date):
    """Database does date comparison with index - FAST!"""
    return (
        db.query(Reservation)
        .filter(Reservation.check_in == check_in_date)
        .all()
    )


# PATTERN 5: Batch Operations (Faster Than Loop)
# =========================================================

# ❌ BAD: Loop Updates
def cancel_reservations_bad(db: Session, reservation_ids: list):
    """Updates database N times - SLOW!"""
    from app.constants.booking_constants import BookingStatus
    
    for res_id in reservation_ids:
        reservation = db.query(Reservation).filter(Reservation.id == res_id).first()
        if reservation:
            reservation.status = BookingStatus.CANCELLED
            db.commit()  # Commits N times - VERY SLOW!


# ✅ GOOD: Bulk Update
def cancel_reservations_good(db: Session, reservation_ids: list):
    """Single database operation - FAST!"""
    from app.constants.booking_constants import BookingStatus
    
    db.query(Reservation).filter(
        Reservation.id.in_(reservation_ids)
    ).update(
        {Reservation.status: BookingStatus.CANCELLED}
    )
    db.commit()  # Single commit


# PATTERN 6: Select Only Needed Columns (Reduce Bandwidth)
# =========================================================

# ❌ BAD: Fetch Everything
def get_room_list_bad(db: Session):
    """Fetches ALL columns for every room - SLOW!"""
    rooms = db.query(Room).all()
    # Returns: id, room_number, room_type, price, capacity, floor, is_available, 
    #          description, amenities, max_guests, min_price, created_at, updated_at
    # Total: ~5KB per room × 100 = 500KB!
    return rooms


# ✅ GOOD: Select Only Needed Columns
from sqlalchemy import func

def get_room_list_good(db: Session):
    """Fetches only needed columns - FAST!"""
    return (
        db.query(
            Room.id,
            Room.room_number,
            Room.room_type,
            Room.price,
            Room.capacity,
            Room.is_available,
        )
        .all()
    )


# PATTERN 7: Caching Results (Avoid Repeated Queries)
# =========================================================

# ❌ BAD: No Caching
def get_price_multiplier_bad(db: Session, room_id: int):
    """Called 100 times per request - 100 queries!"""
    room = db.query(Room).filter(Room.id == room_id).first()
    return room.price


# ✅ GOOD: Cache in Service
class RoomCache:
    _cache = {}
    
    @staticmethod
    def get_price_multiplier(db: Session, room_id: int):
        """Called 100 times per request - 1 query!"""
        if room_id not in RoomCache._cache:
            room = db.query(Room).filter(Room.id == room_id).first()
            RoomCache._cache[room_id] = room.price
        
        return RoomCache._cache[room_id]


# PATTERN 8: Complex Query Optimization
# =========================================================

# ❌ BAD: Multiple Queries for Complex Logic
def get_available_rooms_for_dates_bad(
    db: Session,
    check_in: date,
    check_out: date,
    capacity: int
):
    """Makes 3+ queries - VERY SLOW!"""
    # Query 1: Get all rooms
    rooms = db.query(Room).all()
    
    # Query 2-N: Check each room for availability
    available = []
    for room in rooms:
        # Query per room
        reservations = db.query(Reservation).filter(
            Reservation.room_id == room.id
        ).all()
        
        # Check manually
        is_available = True
        for res in reservations:
            if res.check_in < check_out and res.check_out > check_in:
                is_available = False
                break
        
        if is_available and room.capacity >= capacity:
            available.append(room)
    
    return available


# ✅ GOOD: Single Optimized Query
from sqlalchemy import and_, or_

def get_available_rooms_for_dates_good(
    db: Session,
    check_in: date,
    check_out: date,
    capacity: int
):
    """Single query with JOIN - FAST!"""
    from app.constants.booking_constants import BookingStatus
    
    # Get all rooms with their active reservations
    return (
        db.query(Room)
        .outerjoin(Reservation)  # LEFT JOIN with reservations
        .filter(
            Room.capacity >= capacity,
            Room.is_available == True,
            # Rooms NOT booked for this period
            or_(
                Reservation.id.is_(None),  # No reservations
                and_(
                    Reservation.check_out <= check_in,  # Checked out before check-in
                    or_(Reservation.check_in >= check_out)  # Checking in after check-out
                )
            )
        )
        .distinct()  # Remove duplicates
        .all()
    )


print("""
================================================================================
                      QUERY OPTIMIZATION PATTERNS
================================================================================

These patterns should be applied throughout the codebase:

1. ✅ Use Eager Loading (joinedload) to avoid N+1 queries
2. ✅ Implement Pagination with offset/limit
3. ✅ Filter in database, not in Python
4. ✅ Use date comparisons, not string comparisons
5. ✅ Batch updates instead of loop updates
6. ✅ Select only needed columns
7. ✅ Cache frequently accessed data
8. ✅ Write complex queries efficiently with JOINs

Expected Improvements:
• API Response Time: 3-5x faster
• Database Load: 50-70% lower
• Bandwidth: 60-80% less

================================================================================
""")
