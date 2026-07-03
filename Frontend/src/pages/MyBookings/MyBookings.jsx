import { useState } from "react";
import "./MyBookings.css";

function MyBookings() {

  const [bookings, setBookings] = useState([
    {
      id: "HB10245",
      hotel: "Taj Hotel",
      room: "Deluxe Room",
      checkIn: "10-Jul-2026",
      checkOut: "12-Jul-2026",
      status: "Confirmed",
    },
    {
      id: "HB10246",
      hotel: "Novotel",
      room: "Suite Room",
      checkIn: "18-Jul-2026",
      checkOut: "20-Jul-2026",
      status: "Upcoming",
    },
    {
      id: "HB10247",
      hotel: "ITC Grand",
      room: "Family Room",
      checkIn: "05-Jun-2026",
      checkOut: "07-Jun-2026",
      status: "Completed",
    },
  ]);

  const cancelBooking = (bookingId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    setBookings(updatedBookings);

    alert("Booking cancelled successfully.");
  };

  return (
    <div className="bookings-container">

      <h1>My Bookings</h1>

      <div className="booking-grid">

        {bookings.map((booking) => (

          <div className="booking-card" key={booking.id}>

            <h3>{booking.hotel}</h3>

            <p>
              <strong>Booking ID:</strong> {booking.id}
            </p>

            <p>
              <strong>Room:</strong> {booking.room}
            </p>

            <p>
              <strong>Check-In:</strong> {booking.checkIn}
            </p>

            <p>
              <strong>Check-Out:</strong> {booking.checkOut}
            </p>

            <p>
              <strong>Status:</strong>

              <span
                className={
                  booking.status === "Cancelled"
                    ? "status cancelled"
                    : "status"
                }
              >
                {booking.status}
              </span>
            </p>

            <div className="button-group">

              <button className="view-btn">
                View Details
              </button>

              <button
                className="cancel-btn"
                onClick={() => cancelBooking(booking.id)}
                disabled={
                    booking.status === "Cancelled" ||
                    booking.status === "Completed"
                }
              >
                {booking.status === "Cancelled"
                  ? "Cancelled"
                  : booking.status === "Completed"
                  ? "Completed"
                  : "Cancel Booking"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyBookings;