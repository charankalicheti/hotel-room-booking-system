import { useState } from "react";
import "./Rooms.css";
import RoomCard from "../../components/ui/RoomCard";

function Rooms() {

  const [capacityFilter, setCapacityFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(10000);

  const rooms = [
    {
      id: 1,
      type: "Deluxe Room",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
      price: 3500,
      capacity: "2 Guests",
      amenities: "WiFi • AC • Breakfast",
    },
    {
      id: 2,
      type: "Standard Room",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      price: 2500,
      capacity: "2 Guests",
      amenities: "WiFi • AC",
    },
    {
      id: 3,
      type: "Suite Room",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      price: 6500,
      capacity: "4 Guests",
      amenities: "WiFi • AC • Breakfast • Pool",
    },
    {
      id: 4,
      type: "Family Room",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600",
      price: 4800,
      capacity: "5 Guests",
      amenities: "WiFi • AC • TV",
    },
  ];

  const filteredRooms = rooms.filter((room) => {

    const capacityMatch =
      capacityFilter === "All" ||
      room.capacity.includes(capacityFilter);

    const priceMatch =
      room.price <= priceFilter;

    return capacityMatch && priceMatch;

  });

  return (
    <div className="rooms-page">

      <h1>Available Rooms</h1>

      <p className="subtitle">
        Select the perfect room for your stay.
      </p>

      <div className="filter-container">

        <select
          value={capacityFilter}
          onChange={(e) => setCapacityFilter(e.target.value)}
        >
          <option value="All">All Guests</option>
          <option value="2">2 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
        >
          <option value={10000}>All Prices</option>
          <option value={3000}>Below ₹3000</option>
          <option value={5000}>Below ₹5000</option>
          <option value={7000}>Below ₹7000</option>
        </select>

      </div>

      <div className="rooms-grid">

        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              image={room.image}
              type={room.type}
              capacity={room.capacity}
              amenities={room.amenities}
              price={room.price}
            />
          ))
        ) : (
          <h2>No Rooms Found</h2>
        )}

      </div>

    </div>
  );
}

export default Rooms;