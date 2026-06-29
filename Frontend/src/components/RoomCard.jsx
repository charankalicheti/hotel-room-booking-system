import React from 'react';

export default function RoomCard({ room, isAdmin, onDelete }) {
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

      {isAdmin && (
        <button className="room-delete" onClick={() => onDelete(room.id)}>Delete</button>
      )}
    </article>
  );
}
