import { useState } from "react";
import "./Hotels.css";
import HotelCard from "../../components/ui/HotelCard";

function Hotels() {
  const [search, setSearch] = useState("");

  const hotel = {
    id: 1,
    name: "Taj Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    location: "Hyderabad",
    price: 5000,
    rating: "⭐⭐⭐⭐⭐",
  };

  const isMatch =
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.location.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="hotels-page">
      <h1>Our Hotel</h1>

      <p className="subtitle">
        Welcome to our hotel. Book your stay with comfort and convenience.
      </p>

      <input
        type="text"
        placeholder="🔍 Search by hotel name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="hotel-grid">
        {isMatch ? (
          <HotelCard
            name={hotel.name}
            image={hotel.image}
            location={hotel.location}
            price={hotel.price}
            rating={hotel.rating}
          />
        ) : (
          <h2>Hotel Not Found</h2>
        )}
      </div>
    </div>
  );
}

export default Hotels;