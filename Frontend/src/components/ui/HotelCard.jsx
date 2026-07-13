import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

function HotelCard({
  name,
  image,
  location,
  price,
  rating,
}) {
  const navigate = useNavigate();

  return (
    <div className="hotel-card">
      {image && (
        <img
          src={image}
          alt={name}
          className="hotel-image"
        />
      )}

      <div className="hotel-content">
        <h3>{name}</h3>

        <p className="location">
          📍 {location}
        </p>

        <p className="rating">
          ⭐ {rating}
        </p>

        <h4>₹ {price} / Night</h4>

        <button onClick={() => navigate("/rooms")}>
          View Rooms
        </button>
      </div>
    </div>
  );
}

export default HotelCard;