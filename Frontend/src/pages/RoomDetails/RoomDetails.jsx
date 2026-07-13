import "./RoomDetails.css";

import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { getRooms } from "../../services/roomService";

function RoomDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const checkIn = state?.checkIn || "";
  const checkOut = state?.checkOut || "";
  const guests = state?.guests || 1;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    loadRoomDetails();
  }, [id]);

  const loadRoomDetails = async () => {
    try {
      setLoading(true);

      const data = await getRooms();

      const selectedRoom = data.find(
        (item) => Number(item.id) === Number(id)
      );

      if (!selectedRoom) {
        setRoom(null);
        return;
      }

      const formattedRoom = {
        id: selectedRoom.id,
        roomNumber: selectedRoom.room_number,
        type: selectedRoom.room_type,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
        capacity: selectedRoom.capacity,
        amenities: selectedRoom.description,
        price: selectedRoom.price,
      };

      setRoom(formattedRoom);
    } catch (error) {
      console.error(
        "Failed to load room details:",
        error
      );

      setRoom(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowMessage(true);

      setTimeout(() => {
        navigate("/login");
      }, 1800);

      return;
    }

    if (!checkIn || !checkOut) {
      alert(
        "Please select Check-In and Check-Out dates from Browse Rooms."
      );

      navigate("/customer-dashboard");

      return;
    }

    navigate("/booking", {
      state: {
        room,
        checkIn,
        checkOut,
        guests,
      },
    });
  };

  if (loading) {
    return <h2>Loading Room Details...</h2>;
  }

  if (!room) {
    return <h2>Room Not Found</h2>;
  }

  return (
    <div className="room-details">

      {showMessage && (
        <div className="login-message">
          🔒 Please login to continue booking.
        </div>
      )}

      <img
        src={room.image}
        alt={room.type}
      />

      <div className="details">

        <h1>{room.type}</h1>

        <p>{room.amenities}</p>

        <h3>Room Details</h3>

        <ul>
          <li>
            Room Number: {room.roomNumber}
          </li>

          <li>
            Capacity: {room.capacity} Guests
          </li>

          <li>
            Check-In: {checkIn || "Not Selected"}
          </li>

          <li>
            Check-Out: {checkOut || "Not Selected"}
          </li>

          <li>
            Guests: {guests}
          </li>
        </ul>

        <h2>
          ₹ {room.price} / Night
        </h2>

        <button onClick={handleBooking}>
          Book Now
        </button>

      </div>

    </div>
  );
}

export default RoomDetails;