
import "./AdminDashboard.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom as deleteRoomApi,
} from "../../services/roomService";
function AdminDashboard() {

  const stats = [
    
    {
      title: "Hotel",
      value: 1,
      icon: "🏨",


    },
    {
      title: "Total Bookings",
      value: 350,
      icon: "📅",
    },
    {
      title: "Revenue",
      value: "₹12.5L",
      icon: "💰",
    },
  ];

  const [hotel, setHotel] = useState({
    id: 1,
    name: "Taj Hotel",
    location: "Hyderabad",
    rating: "5 ⭐",
    rooms: 120,
  });
  const [hotelForm, setHotelForm] = useState({
    name: "Taj Hotel",
    location: "Hyderabad",
    rating: "5 ⭐",
    rooms: 120,
  });
  const navigate = useNavigate();
  const { logout } = useAuth();

  
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const [roomForm, setRoomForm] = useState({
    hotel: "Taj Hotel",
    roomNumber: "",
    type: "",
    price: "",
    capacity: "",
    status: "",
  });

  const [editRoomId, setEditRoomId] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  useEffect(() => {
  loadRooms();
}, []);

  

  const handleChange = (e) => {
    setHotelForm({
      ...hotelForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {

    if (
      hotelForm.name === "" ||
      hotelForm.location === "" ||
      hotelForm.rating === "" ||
      hotelForm.rooms === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    setHotel({
      ...hotel,
      ...hotelForm,
      rooms: Number(hotelForm.rooms),
    });

    setHotelForm({
      name: hotelForm.name,
      location: hotelForm.location,
      rating: hotelForm.rating,
      rooms: hotelForm.rooms,
    });

  };

  

  
  const handleRoomChange = (e) => {
    setRoomForm({
      ...roomForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const loadRooms = async () => {
    try {
      const data = await getRooms();

      const formattedRooms = data.map((room) => ({
        id: room.id,
        hotel: hotel.name,
        roomNumber: room.room_number,
        type: room.room_type,
        price: room.price,
        status: room.is_available ? "Available" : "Booked",
      }));

      setRooms(formattedRooms);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoomSubmit = async () => {

    if (
      roomForm.hotel === "" ||
      roomForm.roomNumber === "" ||
      roomForm.type === "" ||
      roomForm.price === "" ||
      roomForm.status === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    const roomData = {
      room_number: roomForm.roomNumber,
      room_type: roomForm.type,
      price: Number(roomForm.price),
      capacity: Number(roomForm.capacity),
      description: roomForm.status,
      is_available: roomForm.status === "Available",
    };

    if (editRoomId !== null) {

      await updateRoom(editRoomId, roomData);
      await loadRooms();

      setEditRoomId(null);

    } else {

      await addRoom(roomData);
      await loadRooms();

    }

    setRoomForm({
      hotel: "Taj Hotel",
      roomNumber: "",
      type: "",
      price: "",
      status: "",
    });

  };
 

  const editRoom = (room) => {

    setRoomForm({
      hotel: room.hotel,
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      status: room.status,
    });

    setEditRoomId(room.id);

  };

  const deleteRoom = async (id) => {

    if (window.confirm("Delete this room?")) {

      await deleteRoomApi(id);
      await loadRooms();
      if (editRoomId === id) {
        setEditRoomId(null);
      }

    }

  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}

      <aside className="admin-sidebar">

        <h2>🏨 Admin Panel</h2>

        <ul>

          <li onClick={() => setActivePage("dashboard")}>
            Dashboard
          </li>

          <li onClick={() => setActivePage("hotel")}>
            Manage Hotel
          </li>

          <li onClick={() => setActivePage("rooms")}>
            Manage Rooms
          </li>

          <li onClick={() => setActivePage("bookings")}>
            Bookings
          </li>

          <li onClick={() => setActivePage("customers")}>
            Customers
          </li>

          <li onClick={handleLogout}>
            Logout
          </li>

        </ul>

      </aside>

      {/* Main Content */}

      <main className="admin-content">

        <h1>Welcome Admin 👋</h1>
        {activePage === "dashboard" && (
          <>

          <p>
            Manage your hotel, rooms and bookings from one place.
          </p>

          {/* Statistics Cards */}

          <div className="admin-stats">

            {stats.map((item, index) => (

            <div
              className="admin-stat-card"
              key={index}
            >

              <div className="admin-stat-icon">
                {item.icon}
              </div>

              <h2>{item.value}</h2>

              <p>{item.title}</p>

            </div>

          ))}

        </div>

        {/* Welcome Card */}
        

        <div className="admin-card">

          <h2>Admin Dashboard</h2>

          <p>
            From here you can:
          </p>

          <ul>
            <li>✔ Manage Hotel</li>
            <li>✔ Manage Rooms</li>
            <li>✔ View All Bookings</li>
            <li>✔ Manage Customers</li>
            <li>✔ View Reports</li>
          </ul>

        </div>
        </>
        )}

        {/* Add / Edit Hotel */}
        {activePage === "hotel" && (
         <>
          <div className="hotel-form">

            <h2>
              Edit Hotel
            </h2>

            
            <input
              type="text"
              name="name"
              placeholder="Hotel Name"
              value={hotelForm.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={hotelForm.location}
              onChange={handleChange}
            />
            

            <input
              type="text"
              name="rating"
              placeholder="Rating (Example: 5 ⭐)"
              value={hotelForm.rating}
              onChange={handleChange}
            />

            <input
              type="number"
              name="rooms"
              placeholder="Rooms"
              value={hotelForm.rooms}
              onChange={handleChange}
            />
            

            
            


            <button onClick={handleSubmit}>
              Update Hotel
            </button>

          </div>
        



        {/* Manage Hotel */}

        <div className="manage-hotel">
          
        

          <h2>Manage Hotel</h2>

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Hotel Name</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Rooms</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>{hotel.rating}</td>
                <td>{hotel.rooms}</td>

                
                <td>Single Hotel</td>
                
              </tr>

            </tbody>

          </table>

        </div>
        </>
        )}
        {activePage === "rooms" && (
         <>
          <div className="room-form">

            <h2>
              {editRoomId ? "Edit Room" : "Add Room"}
            </h2>

            
            <input
              type="text"
              value={hotel.name}
              readOnly
            />
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={roomForm.roomNumber}
              onChange={handleRoomChange}
            />

            <input
              type="text"
              name="type"
              placeholder="Room Type"
              value={roomForm.type}
              onChange={handleRoomChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={roomForm.price}
              onChange={handleRoomChange}
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={roomForm.capacity}
              onChange={handleRoomChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Available / Booked"
              value={roomForm.status}
              onChange={handleRoomChange}
            />
            <button onClick={handleRoomSubmit}>
              {editRoomId ? "Update Room" : "Add Room"}
            </button>

          </div>
        
          <div className="manage-rooms">

            <h2>Manage Rooms</h2>

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Hotel</th>
                  <th>Room No</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {rooms.map((room) => (

                  <tr key={room.id}>

                    <td>{room.id}</td>
                    <td>{room.hotel}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.type}</td>
                    <td>₹{room.price}</td>
                    <td>{room.status}</td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() => editRoom(room)}
                      >
                        Edit
                      </button>

                      {room.status === "Available" ? (
                        <button
                          className="delete-btn"
                          onClick={() => deleteRoom(room.id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="delete-btn"
                          disabled
                        >
                          Cannot Delete
                        </button>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
          </>
          )}
        {/* View All Bookings */}
        {activePage === "bookings" && (
        <div className="manage-bookings">

          <h2>View All Bookings</h2>

          <table>

            <thead>

              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking.id}>

                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.hotel}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>

                  <td>

                    <span
                      className={
                        booking.status === "Confirmed"
                          ? "confirmed-status"
                          : booking.status === "Upcoming"
                          ? "upcoming-status"
                          : booking.status === "Completed"
                          ? "completed-status"
                          : "cancelled-status"
                      }
                    >
                      {booking.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
        )}
        {activePage === "customers" && (
        <div className="manage-customers">

          <h2>Customers</h2>

          <p>
            Customer management will be added after backend integration.
          </p>

        </div>
        )}
      </main>

    </div>
  );
}

export default AdminDashboard;