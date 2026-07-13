import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { getCustomers } from "../../services/customerService";
import { getAllPayments } from "../../services/paymentService";

import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom as deleteRoomApi,
} from "../../services/roomService";

import {
  getAllBookings,
} from "../../services/bookingService";

import {
  getHotel,
  updateHotel,
} from "../../services/hotelService";


function AdminDashboard() {

  const navigate = useNavigate();

  const { logout } = useAuth();


  // =========================================================
  // Hotel State
  // =========================================================

  const [hotel, setHotel] = useState({
    id: null,
    name: "",
    location: "",
    rooms: 0,
  });


  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
  });


  // =========================================================
  // Other States
  // =========================================================

  const [customers, setCustomers] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [payments, setPayments] = useState([]);

  const [editRoomId, setEditRoomId] = useState(null);

  const [activePage, setActivePage] = useState("dashboard");


  // =========================================================
  // Room Form
  // =========================================================

  const [roomForm, setRoomForm] = useState({
    hotel: "",
    roomNumber: "",
    type: "",
    price: "",
    capacity: "",
    status: "",
  });


  // =========================================================
  // Statistics
  // =========================================================

  const stats = [
    { title: "Total Rooms", value: rooms.length, icon: "🚪", },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: "📅",
    },
    {
      title: "Revenue",
      value: `₹${payments
        .reduce(
          (total, payment) =>
            total + Number(payment.amount || 0),
          0
        )
        .toLocaleString("en-IN")}`,
      icon: "💰",
    },
  ];


  // =========================================================
  // Load Hotel
  // =========================================================

  const loadHotel = async () => {

    try {

      const data = await getHotel();

      console.log("Hotel Response:", data);

      setHotel({
        id: data.id,
        name: data.name,
        location: data.location,
        rooms: data.rooms,
      });

      setHotelForm({
        name: data.name,
        location: data.location,
      });

    } catch (error) {

      console.error(
        "Failed to load hotel:",
        error
      );

    }

  };


  // =========================================================
  // Load Rooms
  // =========================================================

  const loadRooms = async () => {

    try {

      const data = await getRooms();

      const formattedRooms = data.map((room) => ({

        id: room.id,

        hotel: hotel.name,

        roomNumber: room.room_number,

        type: room.room_type,

        price: room.price,

        capacity: room.capacity,

        status:
          room.is_available
            ? "Available"
            : "Booked",

      }));

      setRooms(formattedRooms);

    } catch (error) {

      console.error(
        "Failed to load rooms:",
        error
      );

    }

  };


  // =========================================================
  // Load Bookings
  // =========================================================

  const loadBookings = async () => {

    try {

      const data = await getAllBookings();

      const formattedBookings = data.map(
        (booking) => ({

          id: booking.id,

          customer: booking.customer_name,

          hotel: hotel.name,

          room: booking.room_id,

          checkIn: booking.check_in,

          checkOut: booking.check_out,

          status: booking.status,

        })
      );

      setBookings(formattedBookings);

    } catch (error) {

      console.error(
        "Failed to load bookings:",
        error
      );

    }

  };


  // =========================================================
  // Load Customers
  // =========================================================

  const loadCustomers = async () => {

    try {

      const data = await getCustomers();

      setCustomers(data);

    } catch (error) {

      console.error(
        "Failed to load customers:",
        error
      );

    }

  };


  // =========================================================
  // Load Payments
  // =========================================================

  const loadPayments = async () => {

    try {

      const data = await getAllPayments();

      console.log(
        "Payments Response:",
        data
      );

      setPayments(data);

    } catch (error) {

      console.error(
        "Payment Error:",
        error
      );

    }

  };


  // =========================================================
  // Initial Load
  // =========================================================

  useEffect(() => {
    const loadAdminData = async () => {
      await loadHotel();

      await Promise.all([
        loadCustomers(),
        loadPayments(),
      ]);
    };

    loadAdminData();
  }, []);

  useEffect(() => {
    if (hotel.name) {
      loadRooms();
      loadBookings();
    }
  }, [hotel.name]);


  // =========================================================
  // Hotel Form Change
  // =========================================================

  const handleChange = (e) => {

    setHotelForm({

      ...hotelForm,

      [e.target.name]: e.target.value,

    });

  };


  // =========================================================
  // Update Hotel
  // =========================================================

  const handleSubmit = async () => {

    if (
      hotelForm.name.trim() === "" ||
      hotelForm.location.trim() === ""
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }


    const hotelData = {
      name: hotelForm.name,
      location: hotelForm.location,
    };


    try {

      await updateHotel(hotelData);

      await loadHotel();

      alert(
        "✅ Hotel updated successfully."
      );

    } catch (error) {

      console.error(
        "Hotel Update Error:",
        error
      );


      alert(

        error.response?.data?.detail ||

        "Failed to update hotel."

      );

    }

  };


  // =========================================================
  // Room Form Change
  // =========================================================

  const handleRoomChange = (e) => {

    setRoomForm({

      ...roomForm,

      [e.target.name]: e.target.value,

    });

  };


  // =========================================================
  // Add / Update Room
  // =========================================================

  const handleRoomSubmit = async () => {

    if (
      roomForm.roomNumber === "" ||
      roomForm.type === "" ||
      roomForm.price === "" ||
      roomForm.capacity === "" ||
      roomForm.status === ""
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }


    const roomData = {

      room_number: roomForm.roomNumber,

      room_type: roomForm.type,

      price: Number(roomForm.price),

      capacity: Number(roomForm.capacity),

      description: roomForm.status,

      is_available:
        roomForm.status === "Available",

    };


    if (editRoomId !== null) {

      try {

        await updateRoom(
          editRoomId,
          roomData
        );

        await loadRooms();

        await loadHotel();

        alert(
          "✅ Room updated successfully."
        );

        setEditRoomId(null);

      } catch (error) {

        alert(

          error.response?.data?.detail ||

          "Failed to update room."

        );

        return;

      }

    } else {

      try {

        await addRoom(roomData);

        await loadRooms();

        await loadHotel();

        alert(
          "✅ Room added successfully."
        );

      } catch (error) {

        alert(

          error.response?.data?.detail ||

          "Failed to add room."

        );

        return;

      }

    }


    setRoomForm({

      hotel: hotel.name,

      roomNumber: "",

      type: "",

      price: "",

      capacity: "",

      status: "",

    });

  };


  // =========================================================
  // Edit Room
  // =========================================================

  const editRoom = (room) => {

    setRoomForm({

      hotel: room.hotel,

      roomNumber: room.roomNumber,

      type: room.type,

      price: room.price,

      capacity: room.capacity,

      status: room.status,

    });


    setEditRoomId(room.id);

  };


  // =========================================================
  // Delete Room
  // =========================================================

  const deleteRoom = async (id) => {

    if (
      !window.confirm(
        "Delete this room?"
      )
    ) {

      return;

    }


    try {

      await deleteRoomApi(id);

      await loadRooms();

      await loadHotel();

      alert(
        "✅ Room deleted successfully."
      );


      if (editRoomId === id) {

        setEditRoomId(null);

      }

    } catch (error) {

      alert(

        error.response?.data?.detail ||

        "Cannot delete room because it has existing reservations."

      );

    }

  };


  // =========================================================
  // Logout
  // =========================================================

  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="admin-dashboard">


      {/* =====================================================
          Sidebar
      ===================================================== */}


      <aside className="admin-sidebar">

        <h2>
          🏨 Admin Panel
        </h2>


        <ul>

          <li
            onClick={() =>
              setActivePage("dashboard")
            }
          >
            Dashboard
          </li>


          <li
            onClick={() =>
              setActivePage("hotel")
            }
          >
            Manage Hotel
          </li>


          <li
            onClick={() =>
              setActivePage("rooms")
            }
          >
            Manage Rooms
          </li>


          <li
            onClick={() =>
              setActivePage("bookings")
            }
          >
            Bookings
          </li>


          <li
            onClick={() =>
              setActivePage("customers")
            }
          >
            Customers
          </li>


          <li
            onClick={() =>
              setActivePage("payments")
            }
          >
            Payments
          </li>


          <li onClick={handleLogout}>
            Logout
          </li>

        </ul>

      </aside>


      {/* =====================================================
          Main Content
      ===================================================== */}


      <main className="admin-content">


        {/* ===================================================
            Dashboard
        =================================================== */}


        {activePage === "dashboard" && (

          <>

            <h1>
              Welcome Admin 👋
            </h1>


            <p>

              Manage your hotel, rooms and bookings
              from one place.

            </p>


            <div className="admin-stats">


              {stats.map((item, index) => (

                <div
                  className="admin-stat-card"
                  key={index}
                >

                  <div className="admin-stat-icon">

                    {item.icon}

                  </div>


                  <h2>
                    {item.value}
                  </h2>


                  <p>
                    {item.title}
                  </p>

                </div>

              ))}


            </div>


            <div className="admin-card">

              <h2>
                Admin Dashboard
              </h2>


              <p>
                From here you can:
              </p>


              <ul>

                <li>
                  ✔ Manage Hotel
                </li>

                <li>
                  ✔ Manage Rooms
                </li>

                <li>
                  ✔ View All Bookings
                </li>

                <li>
                  ✔ Manage Customers
                </li>

                <li>
                  ✔ View Payments
                </li>

              </ul>

            </div>

          </>

        )}


        {/* ===================================================
            Manage Hotel
        =================================================== */}


        {/* ===================================================
            Manage Hotel
        =================================================== */}

        {activePage === "hotel" && (
          <>
            <div className="hotel-form">
              <h2>Edit Hotel</h2>

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

              <button onClick={handleSubmit}>
                Update Hotel
              </button>
            </div>

            <div className="manage-hotel">
              <h2>Hotel Details</h2>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Hotel Name</th>
                    <th>Location</th>
                    <th>Total Rooms</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{hotel.id}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.location}</td>
                    <td>{hotel.rooms}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        


        {/* ===================================================
            Manage Rooms
        =================================================== */}


        {activePage === "rooms" && (

          <>

            <div className="room-form">

              <h2>

                {editRoomId
                  ? "Edit Room"
                  : "Add Room"}

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


              <select
                name="status"
                value={roomForm.status}
                onChange={handleRoomChange}
              >

                <option value="">
                  Select Status
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Booked">
                  Booked
                </option>

              </select>


              <button onClick={handleRoomSubmit}>

                {editRoomId
                  ? "Update Room"
                  : "Add Room"}

              </button>

            </div>


            <div className="manage-rooms">

              <h2>
                Manage Rooms
              </h2>


              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Hotel</th>

                    <th>Room No</th>

                    <th>Type</th>

                    <th>Price</th>

                    <th>Capacity</th>

                    <th>Status</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>


                  {rooms.map((room) => (

                    <tr key={room.id}>

                      <td>
                        {room.id}
                      </td>

                      <td>
                        {room.hotel}
                      </td>

                      <td>
                        {room.roomNumber}
                      </td>

                      <td>
                        {room.type}
                      </td>

                      <td>
                        ₹{room.price}
                      </td>

                      <td>
                        {room.capacity}
                      </td>

                      <td>
                        {room.status}
                      </td>


                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editRoom(room)
                          }
                        >

                          Edit

                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteRoom(room.id)
                          }
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))}


                </tbody>

              </table>

            </div>

          </>

        )}


        {/* ===================================================
            Bookings
        =================================================== */}


        {activePage === "bookings" && (

          <div className="manage-bookings">

            <h2>
              View All Bookings
            </h2>


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

                    <td>
                      {booking.id}
                    </td>

                    <td>
                      {booking.customer}
                    </td>

                    <td>
                      {booking.hotel}
                    </td>

                    <td>
                      {booking.room}
                    </td>

                    <td>
                      {booking.checkIn}
                    </td>

                    <td>
                      {booking.checkOut}
                    </td>


                    <td>

                      <span
                        className={
                          booking.status === "BOOKED"
                            ? "confirmed-status"
                            : booking.status === "PENDING"
                            ? "pending-status"
                            : "cancelled-status"
                        }
                      >

                        {booking.status === "BOOKED"
                          ? "Confirmed"
                          : booking.status === "PENDING"
                          ? "Pending Payment"
                          : "Cancelled"}

                      </span>

                    </td>

                  </tr>

                ))}


              </tbody>

            </table>

          </div>

        )}


        {/* ===================================================
            Customers
        =================================================== */}


        {activePage === "customers" && (

          <>

            <h1>
              Customers
            </h1>


            <div className="manage-customers">


              <div className="customer-table-container">


                <table>

                  <thead>

                    <tr>

                      <th>ID</th>

                      <th>Name</th>

                      <th>Email</th>

                      <th>Phone</th>

                      <th>Address</th>

                    </tr>

                  </thead>


                  <tbody>


                    {customers.map((customer) => (

                      <tr key={customer.id}>

                        <td>
                          {customer.id}
                        </td>

                        <td>
                          {customer.name}
                        </td>

                        <td>
                          {customer.email}
                        </td>

                        <td>
                          {customer.phone}
                        </td>

                        <td>
                          {customer.address}
                        </td>

                      </tr>

                    ))}


                  </tbody>

                </table>

              </div>

            </div>

          </>

        )}


        {/* ===================================================
            Payments
        =================================================== */}


        {activePage === "payments" && (

          <div className="manage-payments">

            <h2>
              Payment History
            </h2>


            <div className="payment-table-container">


              <table>

                <thead>

                  <tr>

                    <th>Payment ID</th>

                    <th>Customer</th>

                    <th>Room</th>

                    <th>Check-In</th>

                    <th>Check-Out</th>

                    <th>Amount</th>

                    <th>Method</th>

                    <th>Status</th>

                  </tr>

                </thead>


                <tbody>


                  {payments.map((payment) => (

                    <tr key={payment.id}>

                      <td>
                        {payment.id}
                      </td>

                      <td>
                        {payment.customer_name}
                      </td>

                      <td>
                        {payment.room_id}
                      </td>

                      <td>
                        {payment.check_in}
                      </td>

                      <td>
                        {payment.check_out}
                      </td>

                      <td>
                        ₹{payment.amount}
                      </td>

                      <td>
                        {payment.payment_method}
                      </td>

                      <td>

                        <span className="payment-success">

                          {payment.payment_status}

                        </span>

                      </td>

                    </tr>

                  ))}


                </tbody>

              </table>

            </div>

          </div>

        )}


      </main>

    </div>

  );

}


export default AdminDashboard;