import React, { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

export default function BookingModal({ room, onClose, onBookingCreated }) {
  const [customerName, setCustomerName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName || 'Guest',
          room_number: room.room_number,
          check_in: checkIn,
          check_out: checkOut,
          guests,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Booking failed');

      onBookingCreated?.({
        ...data,
        customer_name: customerName || 'Guest',
        room_number: room.room_number,
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
      });
      setSuccess(data);
    } catch (err) {
      setError(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal glass-card">
        <header className="modal-header">
          <h3>Book room {room.room_number}</h3>
          <button onClick={onClose} className="ghost">Close</button>
        </header>

        {success ? (
          <div className="modal-body">
            <p className="success">Booking created — ID: {success.id}</p>
            <div className="modal-actions">
              <button onClick={onClose} className="primary">Done</button>
            </div>
          </div>
        ) : (
          <form className="modal-body" onSubmit={handleSubmit}>
            <label>
              Your name
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Full name" required />
            </label>

            <div className="row">
              <label>
                Check-in
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
              </label>
              <label>
                Check-out
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
              </label>
            </div>

            <label>
              Guests
              <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
            </label>

            {error && <p className="error">{error}</p>}

            <div className="modal-actions">
              <button type="submit" className="primary" disabled={loading}>{loading ? 'Booking...' : 'Book'}</button>
              <button type="button" className="secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
