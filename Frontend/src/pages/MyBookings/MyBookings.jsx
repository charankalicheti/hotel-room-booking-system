import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";
import {
  getCustomerBookings,
  cancelBooking,
} from "../../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getCustomerBookings(user.id);

      setBookings(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load bookings.");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await cancelBooking(bookingId);

      alert("Booking cancelled successfully.");

      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel booking.");
    }
  };

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      <div className="booking-grid">
        {bookings.length === 0 ? (
          <h2>No Bookings Found</h2>
        ) : (
          bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking.id}
            >
              <h3>{booking.hotel || "Hotel"}</h3>

              <p>
                <strong>Booking ID:</strong>{" "}
                {booking.id}
              </p>

              <p>
                <strong>Room:</strong>{" "}
                {booking.room_id}
              </p>

              <p>
                <strong>Check-In:</strong>{" "}
                {booking.check_in}
              </p>

              <p>
                <strong>Check-Out:</strong>{" "}
                {booking.check_out}
              </p>

              <p>
                <strong>Guests:</strong>{" "}
                {booking.guests}
              </p>

              <p>
                <strong>Status:</strong>

                <span
                  className={
                    booking.status === "CANCELLED"
                      ? "status cancelled"
                      : booking.status === "COMPLETED"
                      ? "status completed"
                      : "status"
                  }
                >
                  {booking.status}
                </span>
              </p>

              <div className="button-group">
                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/booking-details/${booking.id}`)
                  }
                >
                  View Details
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    handleCancelBooking(
                      booking.id
                    )
                  }
                  disabled={
                    booking.status === "CANCELLED" ||
                    booking.status === "COMPLETED"
                  }
                >
                  {
                    booking.status === "CANCELLED"
                      ? "Cancelled"
                      : booking.status === "COMPLETED"
                      ? "Completed"
                      : "Cancel Booking"
                  }
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;