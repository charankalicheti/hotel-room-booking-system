import { Link, useLocation } from "react-router-dom";
import "./BookingSuccess.css";

function BookingSuccess() {
  const { state } = useLocation();
  const booking = state?.booking;
  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Booking Confirmed!</h1>

        <p>
          Thank you for choosing our hotel.
          <br />
          Your room has been booked successfully.
        </p>

        <h3>
          Booking ID: <span>#{booking?.id}</span>
        </h3>

        <div className="success-buttons">

          <Link to="/customer-dashboard">
            <button className="home-btn">
              Go to Dashboard
            </button>
          </Link>

          <Link to="/customer-dashboard">
            <button className="booking-btn">
              View My Bookings
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}



export default BookingSuccess;