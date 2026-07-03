import "./HotelCard.css";

function HotelCard({
  name,
  image,
  location,
  price,
  rating,
}) {
  return (
    <div className="hotel-card">
      <img
        src={image}
        alt={name}
        className="hotel-image"
      />

      <div className="hotel-content">
        <h3>{name}</h3>

        <p className="location">
          📍 {location}
        </p>

        <p className="rating">
          ⭐ {rating}
        </p>

        <h4>₹ {price} / Night</h4>

        <button>
          View Rooms
        </button>
      </div>
    </div>
  );
}

export default HotelCard;