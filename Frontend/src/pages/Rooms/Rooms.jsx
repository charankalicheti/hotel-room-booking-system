import { useEffect, useState } from "react";
import "./Rooms.css";
import RoomCard from "../../components/ui/RoomCard";
import {
  getRooms,
  searchAvailableRooms,
} from "../../services/roomService";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(10000);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getRooms();

      const formattedRooms = data.map((room) => ({
        id: room.id,
        roomNumber: room.room_number,
        type: room.room_type,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
        capacity: room.capacity,
        amenities: room.description,
        price: room.price,
      }));

      setRooms(formattedRooms);
    } catch (error) {
      console.error(error);
      alert("Unable to load rooms");
    }
  };
  const handleSearch = async () => {

    if (!checkIn || !checkOut) {
      alert("Please select Check-In and Check-Out dates.");
      return;
    }

    try {

      const data = await searchAvailableRooms(
        checkIn,
        checkOut,
        guests
      );
      console.log("Available Rooms:", data);

      const formattedRooms = data.map((room) => ({
        id: room.id,
        roomNumber: room.room_number,
        type: room.room_type,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
        capacity: room.capacity,
        amenities: room.description,
        price: room.price,
      }));

      setRooms(formattedRooms);

    } catch (error) {

      console.error(error);
      alert("Unable to search available rooms.");

    }
  };

  const filteredRooms = rooms.filter((room) => {
    const capacityMatch =
      capacityFilter === "All" ||
      room.capacity.toString() === capacityFilter;

    const priceMatch = room.price <= priceFilter;

    return capacityMatch && priceMatch;
  });

  return (
    <div className="rooms-page">
      <h2>Browse Rooms</h2>

      <p className="subtitle">
        Choose a room and make your booking.
      </p>
      <div className="search-container">

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          <option value={1}>1 Guest</option>
          <option value={2}>2 Guests</option>
          <option value={3}>3 Guests</option>
          <option value={4}>4 Guests</option>
          <option value={5}>5 Guests</option>
        </select>

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      <div className="filter-container">
        

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
              id={room.id}
              roomNumber={room.roomNumber}
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