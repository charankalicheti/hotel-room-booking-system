import { useNavigate } from "react-router-dom";
import "./RoomCard.css";

function RoomCard({
  id,
  image,
  type,
  capacity,
  amenities,
  price,
  isAvailable,
  checkIn,
  checkOut,
  guests,
  isCustomer,
  showBookingButton,
}) {

  const navigate = useNavigate();

  // ==========================================================
  // Book Room
  // ==========================================================

  const handleBookNow = () => {

    if (!isCustomer) {
      return;
    }

    if (!checkIn || !checkOut) {

      alert(
        "Please select Check-In and Check-Out dates before booking."
      );

      return;
    }

    navigate(`/room-details/${id}`, {
      state: {
        checkIn,
        checkOut,
        guests,
      },
    });

  };

  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="room-card">

      <img
        src={image}
        alt={type}
        className="room-image"
      />

      <div className="room-content">

        <h3>{type}</h3>

        <p className="capacity">
          👥 {capacity} Guests
        </p>

        {amenities && (
          <p className="amenities">
            {amenities}
          </p>
        )}

        <h4>
          ₹ {Number(price).toLocaleString("en-IN")} / Night
        </h4>

        {isAvailable ? (
          <p className="available">
            🟢 Available
          </p>
        ) : (
          <p className="booked">
            🔴 Booked
          </p>
        )}

        {/* Booking Button */}

        {showBookingButton && isAvailable && (
          <button
            className="book-now-btn"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        )}

        {showBookingButton && !isAvailable && (
          <button
            className="book-now-btn"
            disabled
          >
            Booked
          </button>
        )}

      </div>

    </div>

  );

}

export default RoomCard;