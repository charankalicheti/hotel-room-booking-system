import "./HotelCard.css";

function HotelCard({ name, location, price, rating }) {
  return (
    <div className="hotel-card">
      <div className="hotel-image">🏨</div>

      <h3>{name}</h3>

      <p>{location}</p>

      <p className="rating">{rating}</p>

      <h4>₹ {price} / Night</h4>

      <button>Book Now</button>
    </div>
  );
}

export default HotelCard;