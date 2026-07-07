import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerBookings } from "../../services/bookingService";

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const bookings = await getCustomerBookings(user.id);

      const selectedBooking = bookings.find(
        (item) => item.id === Number(id)
      );

      setBooking(selectedBooking);
    } catch (error) {
      console.error(error);
    }
  };

  if (!booking) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h2>Loading Booking Details...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Booking Details
      </h1>

      <p>
        <strong>Booking ID:</strong> {booking.id}
      </p>

      <p>
        <strong>Customer Name:</strong>{" "}
        {booking.customer_name}
      </p>

      <p>
        <strong>Room ID:</strong> {booking.room_id}
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
        <strong>Status:</strong>{" "}
        {booking.status}
      </p>

      <p>
        <strong>Total Price:</strong> ₹
        {booking.total_price}
      </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BookingDetails;