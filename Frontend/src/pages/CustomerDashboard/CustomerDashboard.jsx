import { useState, useRef } from "react";
import "./CustomerDashboard.css";

function CustomerDashboard() {

  const stats = [
    {
      title: "Total Bookings",
      count: 12,
      icon: "📋",
    },
    {
      title: "Upcoming",
      count: 3,
      icon: "📅",
    },
    {
      title: "Completed",
      count: 7,
      icon: "✅",
    },
    {
      title: "Cancelled",
      count: 2,
      icon: "❌",
    },
  ];

  const [profile, setProfile] = useState({
    name: "Sravani",
    email: "sravani@gmail.com",
    phone: "9876543210",
    address: "Hyderabad, Telangana",
  });

  const [isEditing, setIsEditing] = useState(false);
  const dashboardRef = useRef(null);
  const profileRef = useRef(null);
  const upcomingRef = useRef(null);
  const historyRef = useRef(null);

  const upcomingBookings = [
    {
      id: "HB10245",
      hotel: "Taj Hotel",
      room: "Deluxe Room",
      checkIn: "10-Jul-2026",
      checkOut: "12-Jul-2026",
      status: "Upcoming",
    },
    {
      id: "HB10246",
      hotel: "Novotel",
      room: "Suite Room",
      checkIn: "18-Jul-2026",
      checkOut: "20-Jul-2026",
      status: "Upcoming",
    },
  ];
  const bookingHistory = [
    {
      id: "HB10230",
      hotel: "ITC Grand",
      room: "Suite Room",
      checkIn: "05-Jun-2026",
      checkOut: "08-Jun-2026",
      status: "Completed",
    },
    {
      id: "HB10218",
      hotel: "Radisson Blu",
      room: "Deluxe Room",
      checkIn: "18-May-2026",
      checkOut: "20-May-2026",
      status: "Cancelled",
    },
  ];
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
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2>🏨 Hotel Booking</h2>

        <ul>

          <li
            onClick={() => scrollToSection(dashboardRef)}
          >
            Dashboard
          </li>

          <li
            onClick={() => scrollToSection(profileRef)}
          >
            My Profile
          </li>

          <li
            onClick={() => scrollToSection(upcomingRef)}
          >
            Upcoming Bookings
          </li>

          <li
            onClick={() => scrollToSection(historyRef)}
          >
            Booking History
          </li>

          <li>
            Logout
          </li>

        </ul>

      </aside>

      {/* Main Content */}

      <main className="dashboard-content">

        <h1>Welcome, {profile.name} 👋</h1>

        <p>
          Manage your bookings and profile from your dashboard.
        </p>

        {/* Statistics */}

        <div
          className="stats-grid"
          ref={dashboardRef}
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

        {/* Profile Card */}

        <div
          className="profile-card"
          ref={profileRef}
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

        {/* Upcoming Bookings */}

        <div
          className="upcoming-bookings"
          ref={upcomingRef}
        >

          <h2>Upcoming Bookings</h2>

          {upcomingBookings.map((booking) => (

            <div className="booking-card" key={booking.id}>

              <div className="booking-info">

                <h3>{booking.hotel}</h3>

                <p>
                  <strong>Booking ID:</strong> {booking.id}
                </p>

                <p>
                  <strong>Room:</strong> {booking.room}
                </p>

                <p>
                  <strong>Check-In:</strong> {booking.checkIn}
                </p>

                <p>
                  <strong>Check-Out:</strong> {booking.checkOut}
                </p>

                <span className="status">
                  {booking.status}
                </span>

              </div>

              <button>
                View Details
              </button>

            </div>

          ))}

        </div>
      {/* Booking History */}

      <div
        className="booking-history"
        ref={historyRef}
      >

        <h2>Booking History</h2>

        {bookingHistory.map((booking) => (

          <div className="history-card" key={booking.id}>

            <div className="history-info">

              <h3>{booking.hotel}</h3>

              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>

              <p>
                <strong>Room:</strong> {booking.room}
              </p>

              <p>
                <strong>Check-In:</strong> {booking.checkIn}
              </p>

              <p>
                <strong>Check-Out:</strong> {booking.checkOut}
              </p>

              <span
                className={
                  booking.status === "Completed"
                    ? "completed-status"
                    : "cancelled-status"
                }
              >
                {booking.status}
              </span>

            </div>

            <button>
              Booking Details
            </button>

          </div>

        ))}

      </div>

      </main>

    </div>
  );
}

export default CustomerDashboard;
