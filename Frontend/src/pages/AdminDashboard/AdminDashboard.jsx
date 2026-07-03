import { useState, useRef } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {

  const stats = [
    {
      title: "Total Hotels",
      value: 25,
      icon: "🏨",
    },
    {
      title: "Total Rooms",
      value: 120,
      icon: "🛏️",
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

  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Taj Hotel",
      location: "Hyderabad",
      rating: "5 ⭐",
      rooms: 120,
    },
    {
      id: 2,
      name: "Novotel",
      location: "Bangalore",
      rating: "4 ⭐",
      rooms: 95,
    },
    {
      id: 3,
      name: "ITC Grand",
      location: "Chennai",
      rating: "5 ⭐",
      rooms: 150,
    },
    {
      id: 4,
      name: "Radisson Blu",
      location: "Mumbai",
      rating: "4 ⭐",
      rooms: 110,
    },
  ]);

  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
    rating: "",
    rooms: "",
  });
  const [rooms, setRooms] = useState([
    {
      id: 1,
      hotel: "Taj Hotel",
      roomNumber: "101",
      type: "Deluxe",
      price: 4500,
      status: "Available",
    },
    {
      id: 2,
      hotel: "Novotel",
      roomNumber: "205",
      type: "Suite",
      price: 6500,
      status: "Booked",
    },
    {
      id: 3,
      hotel: "ITC Grand",
      roomNumber: "310",
      type: "Standard",
      price: 3000,
      status: "Available",
    },
  ]);
  const [bookings] = useState([
    {
      id: "HB10245",
      customer: "Sravani",
      hotel: "Taj Hotel",
      room: "Deluxe",
      checkIn: "10-Jul-2026",
      checkOut: "12-Jul-2026",
      status: "Confirmed",
    },
    {
      id: "HB10246",
      customer: "Rahul",
      hotel: "Novotel",
      room: "Suite",
      checkIn: "18-Jul-2026",
      checkOut: "20-Jul-2026",
      status: "Upcoming",
    },
    {
      id: "HB10247",
      customer: "Anjali",
      hotel: "ITC Grand",
      room: "Standard",
      checkIn: "02-Jun-2026",
      checkOut: "05-Jun-2026",
      status: "Completed",
    },
    {
      id: "HB10248",
      customer: "Kiran",
      hotel: "Radisson Blu",
      room: "Suite",
      checkIn: "12-May-2026",
      checkOut: "14-May-2026",
      status: "Cancelled",
    },
  ]);
  const dashboardRef = useRef(null);
  const hotelsRef = useRef(null);
  const roomsRef = useRef(null);
  const bookingsRef = useRef(null);
  const customersRef = useRef(null);
  const [roomForm, setRoomForm] = useState({
    hotel: "",
    roomNumber: "",
    type: "",
    price: "",
    status: "",
  });

  const [editRoomId, setEditRoomId] = useState(null);

  const [editId, setEditId] = useState(null);

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

    if (editId !== null) {

      setHotels(
        hotels.map((hotel) =>
          hotel.id === editId
            ? {
                ...hotel,
                ...hotelForm,
              }
            : hotel
        )
      );

      setEditId(null);

    } else {

      const newHotel = {
        id: hotels.length + 1,
        name: hotelForm.name,
        location: hotelForm.location,
        rating: hotelForm.rating,
        rooms: Number(hotelForm.rooms),
      };

      setHotels([...hotels, newHotel]);

    }

    setHotelForm({
      name: "",
      location: "",
      rating: "",
      rooms: "",
    });

  };

  const editHotel = (hotel) => {

    setHotelForm({
      name: hotel.name,
      location: hotel.location,
      rating: hotel.rating,
      rooms: hotel.rooms,
    });

    setEditId(hotel.id);

  };

  const deleteHotel = (id) => {

    if (window.confirm("Delete this hotel?")) {

      setHotels(
        hotels.filter((hotel) => hotel.id !== id)
      );

    }

  };
  const handleRoomChange = (e) => {
    setRoomForm({
      ...roomForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoomSubmit = () => {

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

    if (editRoomId !== null) {

      setRooms(
        rooms.map((room) =>
          room.id === editRoomId
            ? { ...room, ...roomForm }
            : room
        )
      );

      setEditRoomId(null);

    } else {

      setRooms([
        ...rooms,
        {
          id: rooms.length + 1,
          hotel: roomForm.hotel,
          roomNumber: roomForm.roomNumber,
          type: roomForm.type,
          price: Number(roomForm.price),
          status: roomForm.status,
        },
      ]);

    }

    setRoomForm({
      hotel: "",
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

  const deleteRoom = (id) => {

    if (window.confirm("Delete this room?")) {

      setRooms(
        rooms.filter((room) => room.id !== id)
      );
      if (editRoomId === id) {
        setEditRoomId(null);
      }

    }

  };
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}

      <aside className="admin-sidebar">

        <h2>🏨 Admin Panel</h2>

        <ul>

          <li
            className="active"
            onClick={() => scrollToSection(dashboardRef)}
          >
            Dashboard
          </li>

          <li
            onClick={() => scrollToSection(hotelsRef)}
          >
            Manage Hotels
          </li>

          <li
            onClick={() => scrollToSection(roomsRef)}
          >
            Manage Rooms
          </li>

          <li
            onClick={() => scrollToSection(bookingsRef)}
          >
            Bookings
          </li>

          <li
            onClick={() => scrollToSection(customersRef)}
          >
            Customers
          </li>

          <li>
            Logout
          </li>

        </ul>

      </aside>

      {/* Main Content */}

      <main
        className="admin-content"
        ref={dashboardRef}
      >

        <h1>Welcome Admin 👋</h1>

        <p>
          Manage hotels, rooms and bookings from one place.
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
            <li>✔ Manage Hotels</li>
            <li>✔ Manage Rooms</li>
            <li>✔ View All Bookings</li>
            <li>✔ Manage Customers</li>
            <li>✔ View Reports</li>
          </ul>

        </div>

        {/* Add / Edit Hotel */}

        <div className="hotel-form">

          <h2>
            {editId ? "Edit Hotel" : "Add Hotel"}
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
            {editId ? "Update Hotel" : "Add Hotel"}
          </button>

        </div>

        {/* Manage Hotels */}

        <div
          className="manage-hotels"
          ref={hotelsRef}
        >

          <h2>Manage Hotels</h2>

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

              {hotels.map((hotel) => (

                <tr key={hotel.id}>

                  <td>{hotel.id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.location}</td>
                  <td>{hotel.rating}</td>
                  <td>{hotel.rooms}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => editHotel(hotel)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteHotel(hotel.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
        <div className="room-form">

          <h2>
            {editRoomId ? "Edit Room" : "Add Room"}
          </h2>

          <input
            type="text"
            name="hotel"
            placeholder="Hotel Name"
            value={roomForm.hotel}
            onChange={handleRoomChange}
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
        <div
          className="manage-rooms"
          ref={roomsRef}
        >

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

                    <button
                      className="delete-btn"
                      onClick={() => deleteRoom(room.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
        {/* View All Bookings */}

        <div
          className="manage-bookings"
          ref={bookingsRef}
        >

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

        <div
          className="manage-customers"
          ref={customersRef}
        >

          <h2>Customers</h2>

          <p>
            Customer management will be added after backend integration.
          </p>

        </div>
      </main>

    </div>
  );
}

export default AdminDashboard;