import React from 'react';
import RoomForm from '../components/RoomForm';
import RoomGrid from '../components/RoomGrid';

export default function RoomsPage({
  rooms,
  isAdmin,
  onDelete,
  token,
  showAddForm,
  setShowAddForm,
  newRoom,
  setNewRoom,
  handleAddRoom,
  loading,
  bookings,
  onBookingCreated,
  onDeleteBooking,
}) {
  return (
    <section className="page-shell rooms-page">
      <div className="page-header glass-card">
        <div>
          <p className="eyebrow">Room collection</p>
          <h1>Browse available room categories</h1>
          <p>Find the right stay for your needs with clear details, pricing, and availability.</p>
        </div>
      </div>

      <div className="room-summary glass-card split-row">
        <div>{rooms.length} rooms listed</div>
        <div>{rooms.filter((room) => room.is_available).length} currently available</div>
      </div>

      {token && isAdmin && (
        <div className="room-actions glass-card">
          <button className="primary" onClick={() => setShowAddForm((value) => !value)}>
            {showAddForm ? 'Hide room form' : 'Add new room'}
          </button>
        </div>
      )}

      {token && isAdmin && (
        <div className="glass-card booking-admin-section">
          <div className="booking-section-header">
            <div>
              <p className="eyebrow">Admin booking board</p>
              <h2>Booked rooms</h2>
            </div>
            <span className="booking-count-pill">{bookings.length} booking{bookings.length === 1 ? '' : 's'}</span>
          </div>

          {bookings.length === 0 ? (
            <div className="empty-state">No bookings recorded yet.</div>
          ) : (
            <div className="booking-list">
              {bookings.map((booking) => {
                const checkInDate = new Date(booking.check_in);
                const checkOutDate = new Date(booking.check_out);
                const daysBooked = Number.isNaN(checkInDate.getTime()) || Number.isNaN(checkOutDate.getTime())
                  ? 1
                  : Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));

                return (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-main">
                      <div className="booking-title-row">
                        <strong>{booking.customer_name}</strong>
                        <span className="booking-status">{booking.status || 'BOOKED'}</span>
                      </div>
                      <p className="booking-details">Room {booking.room_number || '—'} • {booking.guests} guest{booking.guests === 1 ? '' : 's'}</p>
                      <div className="booking-meta">
                        <span>Check-in: {booking.check_in || '—'}</span>
                        <span>Check-out: {booking.check_out || '—'}</span>
                        <span>Booked for {daysBooked} day{daysBooked === 1 ? '' : 's'}</span>
                      </div>
                    </div>
                    <button className="room-delete" onClick={() => onDeleteBooking(booking.id)}>
                      Delete booking
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {showAddForm && token && isAdmin && (
        <div className="glass-card room-form-wrapper">
          <RoomForm
            newRoom={newRoom}
            onChange={setNewRoom}
            onSubmit={handleAddRoom}
            onCancel={() => {
              setShowAddForm(false);
              setNewRoom({ room_number: '', room_type: 'Standard', price: 120, capacity: 2, description: '', is_available: true });
            }}
            loading={loading}
          />
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="empty-state glass-card">No rooms found. Please check back later.</div>
      ) : (
        <RoomGrid rooms={rooms} isAdmin={isAdmin} onDelete={onDelete} onBookingCreated={onBookingCreated} />
      )}
    </section>
  );
}
