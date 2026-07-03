import "./RoomDetails.css";

function RoomDetails() {
  return (
    <div className="room-details">

      <img
        src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1000"
        alt="Room"
      />

      <div className="details">

        <h1>Deluxe Room</h1>

        <p>
          Spacious deluxe room with modern interiors and a beautiful city view.
        </p>

        <h3>Amenities</h3>

        <ul>
          <li>✅ Free WiFi</li>
          <li>✅ Air Conditioning</li>
          <li>✅ Breakfast Included</li>
          <li>✅ Smart TV</li>
          <li>✅ Swimming Pool Access</li>
        </ul>

        <h2>₹3500 / Night</h2>

        <button>Proceed to Booking</button>

      </div>

    </div>
  );
}

export default RoomDetails;