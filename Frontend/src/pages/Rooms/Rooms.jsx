import { useEffect, useState } from "react";
import "./Rooms.css";

import RoomCard from "../../components/ui/RoomCard";

import {
  getRooms,
  searchAvailableRooms,
} from "../../services/roomService";

import {
  getRoomBookedDates,
} from "../../services/bookingService";
import { useLocation } from "react-router-dom";


function Rooms({
  fromCustomerDashboard = false,
}) {

  // ==========================================================
  // Logged-In Customer Check
  // ==========================================================

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const userRole =
    user?.role ||
    user?.user_type ||
    user?.type;

  const isCustomer =
    Boolean(token) &&
    Boolean(user) &&
    userRole?.toLowerCase() === "customer";


  // ==========================================================
  // State
  // ==========================================================

  const [rooms, setRooms] = useState([]);

  const [bookedDates, setBookedDates] = useState({});

  const [priceFilter, setPriceFilter] = useState("all");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(1);

  const [searched, setSearched] = useState(false);
  const location = useLocation();

  


  // ==========================================================
  // Room Image Based On Room Type
  // ==========================================================

  const getRoomImage = (roomType) => {

    const type =
      roomType?.toLowerCase() || "";


    if (type.includes("presidential")) {

      return "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900";

    }


    if (type.includes("luxury")) {

      return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900";

    }


    if (type.includes("family")) {

      return "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900";

    }


    if (type.includes("executive")) {

      return "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900";

    }


    if (type.includes("deluxe")) {

      return "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900";

    }


    if (type.includes("standard")) {

      return "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=900";

    }


    return "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900";

  };


  // ==========================================================
  // Format Rooms
  // ==========================================================

  const formatRooms = (data) => {

    return data.map((room) => ({

      id: room.id,

      roomNumber: room.room_number,

      type: room.room_type,

      image: getRoomImage(
        room.room_type
      ),

      capacity: room.capacity,

      amenities: room.description,

      price: room.price,
      isAvailable: room.is_available,

    }));

  };


  // ==========================================================
  // Load All Rooms
  // ==========================================================

  const loadAllRooms = async () => {

    try {

      // Public User

      if (!isCustomer) {

        const roomsData =
          await getRooms();


        const formattedRooms =
          formatRooms(roomsData);


        setRooms(formattedRooms);

        setBookedDates({});

        setSearched(false);

        return;

      }


      // Customer

      const [
        roomsData,
        bookedDatesData,
      ] = await Promise.all([

        getRooms(),

        getRoomBookedDates(),

      ]);


      const formattedRooms =
        formatRooms(roomsData);


      setRooms(formattedRooms);


      setBookedDates(
        bookedDatesData || {}
      );


      setSearched(false);


    } catch (error) {

      console.error(
        "Failed to load rooms:",
        error
      );


      setRooms([]);

      setBookedDates({});

    }

  };


  // ==========================================================
  // Initial Load
  // ==========================================================

  useEffect(() => {

    loadAllRooms();

  }, []);


  // ==========================================================
  // Search Available Rooms
  // ==========================================================

  const handleSearch = async () => {

    if (!isCustomer) {

      return;

    }


    if (!checkIn && !checkOut) {

      await loadAllRooms();

      return;

    }


    if (!checkIn || !checkOut) {

      alert(
        "Please select both Check-In and Check-Out dates."
      );

      return;

    }


    if (checkOut <= checkIn) {

      alert(
        "Check-Out date must be after Check-In date."
      );

      return;

    }


    try {

      const data =
        await searchAvailableRooms(
          checkIn,
          checkOut,
          guests
        );


      const formattedRooms =
        formatRooms(data);


      setRooms(formattedRooms);

      setSearched(true);


    } catch (error) {

      console.error(
        "Unable to search available rooms:",
        error
      );


      alert(
        error.response?.data?.detail ||
        "Unable to search available rooms."
      );


      setRooms([]);

      setSearched(true);

    }

  };


  // ==========================================================
  // Price Filter
  // ==========================================================

  const filteredRooms = rooms.filter((room) => {

    const price = Number(room.price);


    if (priceFilter === "below3000") {

      return price < 3000;

    }


    if (priceFilter === "below5000") {

      return price < 5000;

    }


    if (priceFilter === "below7000") {

      return price < 7000;

    }


    if (priceFilter === "above7000") {

      return price >= 7000;

    }


    return true;

  });


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="rooms-page">


      <h2>
        Browse Rooms
      </h2>


      <p className="subtitle">

        {isCustomer
          ? "Select your stay dates to check room availability."
          : "Explore our rooms and find the perfect stay for you."
        }

      </p>


      {/* ======================================================
          Customer Search Only
      ====================================================== */}

      {isCustomer && (

        <div className="search-container">


          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              setCheckIn(e.target.value)
            }
          />


          <input
            type="date"
            value={checkOut}
            onChange={(e) =>
              setCheckOut(e.target.value)
            }
          />


          <select
            value={guests}
            onChange={(e) =>
              setGuests(
                Number(e.target.value)
              )
            }
          >

            <option value={1}>
              1 Guest
            </option>

            <option value={2}>
              2 Guests
            </option>

            <option value={3}>
              3 Guests
            </option>

            <option value={4}>
              4 Guests
            </option>

            <option value={5}>
              5 Guests
            </option>

          </select>


          <button
            className="search-btn"
            onClick={handleSearch}
          >

            Search

          </button>


        </div>

      )}


      {/* ======================================================
          Customer Price Filter Only
      ====================================================== */}

      {isCustomer && (

        <div className="filter-container">


          <select
            value={priceFilter}
            onChange={(e) =>
              setPriceFilter(e.target.value)
            }
          >

            <option value="all">
              All Prices
            </option>

            <option value="below3000">
              Below ₹3000
            </option>

            <option value="below5000">
              Below ₹5000
            </option>

            <option value="below7000">
              Below ₹7000
            </option>

            <option value="above7000">
              ₹7000 and Above
            </option>

          </select>


        </div>

      )}


      {/* ======================================================
          Rooms
      ====================================================== */}

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
              isAvailable={room.isAvailable}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              searched={searched}
              bookedDates={
                bookedDates[String(room.id)] || []
              }
              isCustomer={isCustomer}
              showBookingButton={fromCustomerDashboard}
            />

          ))

        ) : searched ? (

          <h2>
            No Rooms Available
          </h2>

        ) : (

          <h2>
            No Rooms Found
          </h2>

        )}


      </div>


    </div>

  );

}


export default Rooms;