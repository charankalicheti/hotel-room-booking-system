import "./RoomCard.css";
import { useNavigate } from "react-router-dom";

function RoomCard({
  id,
  roomNumber,
  image,
  type,
  capacity,
  amenities,
  price,
}) {

  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/room-details", {
      state: {
        room: {
          id,
          roomNumber,
          type,
          capacity,
          amenities,
          price,
          image,
        },
      },
    });
  };

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
          👥 {capacity}
        </p>

        <p className="amenities">
          {amenities}
        </p>

        <h4>₹ {price} / Night</h4>

        <button onClick={handleBookNow}>
          Book Now
        </button>

      </div>

    </div>
  );
}

export default RoomCard;