import { useState } from "react";
import "./Hotels.css";
import HotelCard from "../../components/ui/HotelCard";

function Hotels() {
  const [search, setSearch] = useState("");

  const hotels = 
    {
      id: 1,
      name: "Taj Hotel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
      location: "Hyderabad",
      price: 5000,
      rating: "⭐⭐⭐⭐⭐",
    };
   

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hotels-page">
      <h1>Our Hotels</h1>

      <p className="subtitle">
        Choose the perfect hotel for your next stay.
      </p>

      <input
        type="text"
        placeholder="🔍 Search by hotel name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="hotel-grid">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              image={hotel.image}
              location={hotel.location}
              price={hotel.price}
              rating={hotel.rating}
            />
          ))
        ) : (
          <h2>No Hotels Found</h2>
        )}
      </div>
    </div>
  );
}

export default Hotels;