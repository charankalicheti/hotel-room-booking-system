import React from 'react';

export default function RoomForm({ newRoom, onChange, onCancel, onSubmit, loading }) {
  return (
    <form className="room-form" onSubmit={onSubmit}>
      <div className="room-form-row">
        <input
          placeholder="Room number"
          value={newRoom.room_number}
          onChange={(e) => onChange({ ...newRoom, room_number: e.target.value })}
          required
        />
        <input
          placeholder="Room type"
          value={newRoom.room_type}
          onChange={(e) => onChange({ ...newRoom, room_type: e.target.value })}
          required
        />
      </div>

      <div className="room-form-row">
        <input
          type="number"
          placeholder="Price"
          value={newRoom.price}
          onChange={(e) => onChange({ ...newRoom, price: Number(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={(e) => onChange({ ...newRoom, capacity: Number(e.target.value) })}
          required
        />
      </div>

      <textarea
        placeholder="Description"
        value={newRoom.description}
        onChange={(e) => onChange({ ...newRoom, description: e.target.value })}
      />

      <label className="room-form-checkbox">
        <input
          type="checkbox"
          checked={newRoom.is_available}
          onChange={(e) => onChange({ ...newRoom, is_available: e.target.checked })}
        />
        Available
      </label>

      <div className="room-form-actions">
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Create Room'}</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
