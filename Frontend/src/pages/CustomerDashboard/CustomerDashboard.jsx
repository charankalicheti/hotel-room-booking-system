import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCustomerBookings } from "../../services/bookingService";
import "./CustomerDashboard.css";
import Rooms from "../Rooms/Rooms";
import MyBookings from "../MyBookings/MyBookings";
function CustomerDashboard() {

  const [stats, setStats] = useState([
    {
      title: "Total Bookings",
      count: 0,
      icon: "📋",
    },
    {
      title: "Upcoming",
      count: 0,
      icon: "📅",
    },
    {
      title: "Completed",
      count: 0,
      icon: "✅",
    },
    {
      title: "Cancelled",
      count: 0,
      icon: "❌",
    },
  ]);

  
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
 
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, []);

  const loadBookings = async () => {
    try {
      if (!user?.id) return;
      const data = await getCustomerBookings(user.id);

      const upcoming = data.filter(
        (booking) => booking.status === "BOOKED"
      );

      const history = data.filter(
        (booking) =>
          booking.status === "COMPLETED" ||
          booking.status === "CANCELLED"
      );

      setUpcomingBookings(upcoming);
      setBookingHistory(history);

      setStats([
        {
          title: "Total Bookings",
          count: data.length,
          icon: "📋",
        },
        {
          title: "Upcoming",
          count: upcoming.length,
          icon: "📅",
        },
        {
          title: "Completed",
          count: history.filter(
            (b) => b.status === "COMPLETED"
          ).length,
          icon: "✅",
        },
        {
          title: "Cancelled",
          count: history.filter(
            (b) => b.status === "CANCELLED"
          ).length,
          icon: "❌",
        },
      ]);

    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };
  

  return (
    <div className="dashboard-container">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2>🏨 Hotel Booking</h2>

        <ul>

          <li onClick={() => setActivePage("dashboard")}>
            Dashboard
          </li>

          <li onClick={() => setActivePage("profile")}>
            My Profile
          </li>

          <li onClick={() => setActivePage("rooms")}>
            Browse Rooms
          </li>

          <li onClick={() => setActivePage("upcoming")}>
            Upcoming Bookings
          </li>

          <li onClick={() => setActivePage("bookings")}>
            My Bookings
          </li>

          <li onClick={() => setActivePage("history")}>
            Booking History
          </li>

          <li onClick={handleLogout}>
            Logout
          </li>

        </ul>




      </aside>

      {/* Main Content */}

      <main className="dashboard-content">

        {activePage === "dashboard" && (
        <>

          <h1>Welcome, {profile.name} 👋</h1>

          <p>
            Manage your bookings and profile from your dashboard.
          </p>

        {/* Statistics */}

        <div
          className="stats-grid"
          
        >

          {stats.map((item, index) => (

            <div className="stat-card" key={index}>

              <div className="stat-icon">
                {item.icon}
              </div>

              <h2>{item.count}</h2>

              <p>{item.title}</p>

            </div>

          ))}

        </div>

        {/* Welcome Card */}

        <div className="welcome-card">

          <h2>Customer Dashboard</h2>

          <p>From here you can:</p>

          <ul>
            <li>✔ View your bookings</li>
            <li>✔ Update your profile</li>
            <li>✔ Check upcoming stays</li>
            <li>✔ View booking history</li>
          </ul>

        </div>

            </>
          )}

        {/* Profile Card */}

        {activePage === "profile" && (

        <div
          className="profile-card"
          
        >

          <h2>My Profile</h2>

          <div className="profile-field">

            <label>Full Name</label>

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            ) : (
              <strong>{profile.name}</strong>
            )}

          </div>

          <div className="profile-field">

            <label>Email</label>

            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <strong>{profile.email}</strong>
            )}

          </div>

          <div className="profile-field">

            <label>Phone Number</label>

            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            ) : (
              <strong>{profile.phone}</strong>
            )}

          </div>

          <div className="profile-field">

            <label>Address</label>

            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            ) : (
              <strong>{profile.address}</strong>
            )}

          </div>

          {isEditing ? (
            <button onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}

        </div>

        )}

        {/* Browse Rooms */}

        {activePage === "rooms" && (
          <Rooms />
        )}

        {/* Upcoming Bookings */}

        {activePage === "upcoming" && (

        <div
          className="upcoming-bookings"
                  
                >

          <h2>Upcoming Bookings</h2>

          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (

              <div className="booking-card" key={booking.id}>

                <div className="booking-info">

                  <h3>Hotel</h3>

                  <p>
                    <strong>Booking ID:</strong> {booking.id}
                  </p>

                  <p>
                    <strong>Room Number:</strong> {booking.room_number || booking.room_id}
                  </p>

                  <p>
                    <strong>Check-In:</strong> {booking.check_in}
                  </p>

                  <p>
                    <strong>Check-Out:</strong> {booking.check_out}
                  </p>

                  <span className="status">
                    {booking.status}
                  </span>

                </div>

                <button
                  onClick={() =>
                    navigate(`/booking-details/${booking.id}`)
                  }
                >
                  View Details
                </button>

              </div>

            ))
          ) : (
            <p>No Upcoming Bookings</p>
          )}
        </div>

        )}

        {/* My Bookings */}

        {activePage === "bookings" && (
          <MyBookings />
        )}

        {/* Booking History */}
      {activePage === "history" && (

      <div
        className="booking-history"
        
      >

        <h2>Booking History</h2>

        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking) => (


          <div className="history-card" key={booking.id}>

            <div className="history-info">

              <h3>{booking.hotel_name}</h3>

              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>

              <p>
                <strong>Room:</strong> {booking.room_type}
              </p>

              <p>
                <strong>Check-In:</strong> {booking.check_in}
              </p>

              <p>
                <strong>Check-Out:</strong> {booking.check_out}
              </p>

              <span
                className={
                  booking.status === "COMPLETED"
                    ? "completed-status"
                    : "cancelled-status"
                }
              >
                {booking.status}
              </span>

            </div>

            <button
              onClick={() =>
                navigate(`/booking-details/${booking.id}`)
              }
            >
              Booking Details
            </button>

          </div>

        ))
        ) : (
          <p>No Booking History</p>
        )}



      </div>
      
      )}

      </main>

    </div>
  );
}

export default CustomerDashboard;












