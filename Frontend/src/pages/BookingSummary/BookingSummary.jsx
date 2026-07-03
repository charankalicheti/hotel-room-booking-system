import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSummary.css";

function BookingSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="summary-container">
        <div className="summary-card">
          <h2>No Booking Details Found</h2>
          <button onClick={() => navigate("/booking")}>
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  const handleProceed = () => {
    navigate("/payment", {
      state: state,
    });
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h1>Booking Summary</h1>

        <div className="summary-row">
          <span>Full Name</span>
          <strong>{state.fullName}</strong>
        </div>

        <div className="summary-row">
          <span>Email</span>
          <strong>{state.email}</strong>
        </div>

        <div className="summary-row">
          <span>Phone Number</span>
          <strong>{state.phone}</strong>
        </div>

        <div className="summary-row">
          <span>Check-In Date</span>
          <strong>{state.checkIn}</strong>
        </div>

        <div className="summary-row">
          <span>Check-Out Date</span>
          <strong>{state.checkOut}</strong>
        </div>

        <div className="summary-row">
          <span>Guests</span>
          <strong>{state.guests}</strong>
        </div>

        <div className="summary-row">
          <span>Special Requests</span>
          <strong>{state.specialRequest || "None"}</strong>
        </div>

        <button onClick={handleProceed}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;