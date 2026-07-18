import React from 'react';
import RoomCard from './RoomCard';

export default function RoomGrid({ rooms, isAdmin, onDelete }) {
  return (
    <div className="room-grid">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} isAdmin={isAdmin} onDelete={onDelete} />
      ))}
    </div>
  );
}
