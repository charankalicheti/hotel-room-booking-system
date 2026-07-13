import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSummary.css";

function BookingSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.booking || !state.room) {
    return (
      <div className="summary-container">
        <div className="summary-card">
          <h2>No Booking Details Found</h2>

          <button
            onClick={() =>
              navigate("/customer-dashboard")
            }
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    booking,
    room,
    customerDetails,
  } = state;

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        booking,
        room,
        customerDetails,
      },
    });
  };

  return (
    <div className="summary-container">
      <div className="summary-card">

        <h1>Booking Summary</h1>

        <div className="summary-row">
          <span>Customer Name</span>
          <strong>{booking.customer_name}</strong>
        </div>

        <div className="summary-row">
          <span>Room Number</span>
          <strong>{room.roomNumber}</strong>
        </div>

        <div className="summary-row">
          <span>Room Type</span>
          <strong>{room.type}</strong>
        </div>

        <div className="summary-row">
          <span>Check-In Date</span>
          <strong>{booking.check_in}</strong>
        </div>

        <div className="summary-row">
          <span>Check-Out Date</span>
          <strong>{booking.check_out}</strong>
        </div>

        <div className="summary-row">
          <span>Guests</span>
          <strong>{booking.guests}</strong>
        </div>

        <div className="summary-row">
          <span>Amount</span>
          <strong>
            ₹ {booking.total_price}
          </strong>
        </div>

        <div className="summary-row">
          <span>Booking Status</span>

          <strong className="pending-status">
            PENDING PAYMENT
          </strong>
        </div>

        <button onClick={handleProceed}>
          Proceed to Payment
        </button>

      </div>
    </div>
  );
}

export default BookingSummary;