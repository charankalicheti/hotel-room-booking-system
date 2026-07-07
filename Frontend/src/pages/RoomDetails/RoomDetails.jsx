import "./RoomDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

function RoomDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const room = state?.room;

  if (!room) {
    return <h2>No Room Selected</h2>;
  }

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        room,
      },
    });
  };

  return (
    <div className="room-details">

      <img
        src={room.image}
        alt={room.type}
      />

      <div className="details">

        <h1>{room.type}</h1>

        <p>{room.amenities}</p>

        <h3>Room Details</h3>

        <ul>
          <li>Room Number: {room.roomNumber}</li>
          <li>Capacity: {room.capacity} Guests</li>
        </ul>

        <h2>₹{room.price} / Night</h2>

        <button onClick={handleBooking}>
          Proceed to Booking
        </button>

      </div>

    </div>
  );
}

export default RoomDetails;