import React, { useState } from 'react';
import BookingModal from './BookingModal';

export default function RoomCard({ room, isAdmin, onDelete, onBookingCreated }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <article className="room-card">
      <div className="room-card-main">
        <div>
          <p className="room-number">{room.room_number}</p>
          <p className="room-type">{room.room_type}</p>
        </div>
        <p className="room-price">₹{room.price.toLocaleString()}</p>
      </div>

      <p className="room-description">{room.description || 'No description provided.'}</p>
      <div className="room-meta">
        <span>{room.capacity} guests</span>
        <span>{room.is_available ? 'Available' : 'Unavailable'}</span>
      </div>

      <div className="card-actions">
        {!isAdmin && room.is_available && (
          <button className="primary" onClick={() => setShowBooking(true)}>Book</button>
        )}

        {isAdmin && (
          <button className="room-delete" onClick={() => onDelete(room.id)}>Delete</button>
        )}
      </div>

      {showBooking && <BookingModal room={room} onClose={() => setShowBooking(false)} onBookingCreated={onBookingCreated} />}
    </article>
  );
}
