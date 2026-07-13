import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getCustomerBookings } from "../../services/bookingService";

import "./CustomerDashboard.css";

import Rooms from "../Rooms/Rooms";
import MyBookings from "../MyBookings/MyBookings";


function CustomerDashboard() {

  // =====================================================
  // User
  // =====================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );


  // =====================================================
  // Navigation / Authentication
  // =====================================================

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [activePage, setActivePage] = useState(
    "dashboard"
  );


  // =====================================================
  // Profile
  // =====================================================

  const [profile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });


  // =====================================================
  // Statistics
  // =====================================================

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
      title: "Pending",
      count: 0,
      icon: "⏳",
    },
    {
      title: "Cancelled",
      count: 0,
      icon: "❌",
    },
  ]);


  // =====================================================
  // Load Customer Bookings
  // =====================================================

  useEffect(() => {

    if (user?.id) {
      loadBookings();
    }

  }, []);


  const loadBookings = async () => {

    try {

      if (!user?.id) {
        return;
      }

      const data = await getCustomerBookings(
        user.id
      );


      // Confirmed Bookings

      const upcoming = data.filter(
        (booking) =>
          booking.status === "BOOKED"
      );


      // Pending Payment

      const pending = data.filter(
        (booking) =>
          booking.status === "PENDING"
      );


      // Cancelled / Expired

      const cancelled = data.filter(
        (booking) =>
          booking.status === "CANCELLED" ||
          booking.status === "EXPIRED"
      );


      // Update Statistics

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
          title: "Pending",
          count: pending.length,
          icon: "⏳",
        },
        {
          title: "Cancelled",
          count: cancelled.length,
          icon: "❌",
        },
      ]);

    } catch (error) {

      console.error(
        "Unable to load booking statistics:",
        error
      );

    }

  };


  // =====================================================
  // Logout
  // =====================================================

  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="dashboard-container">


      {/* =================================================
          Sidebar
      ================================================= */}

      <aside className="sidebar">

        <h2>🏨 Hotel Booking</h2>


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
              setActivePage("profile")
            }
          >
            My Profile
          </li>


          <li
            onClick={() =>
              setActivePage("rooms")
            }
          >
            Browse Rooms
          </li>


          <li
            onClick={() =>
              setActivePage("bookings")
            }
          >
            My Bookings
          </li>


          <li onClick={handleLogout}>
            Logout
          </li>

        </ul>

      </aside>


      {/* =================================================
          Main Content
      ================================================= */}

      <main className="dashboard-content">


        {/* =================================================
            Dashboard
        ================================================= */}

        {activePage === "dashboard" && (

          <>

            <h1>
              Welcome, {profile.name} 👋
            </h1>


            <p>
              Manage your bookings and profile
              from your dashboard.
            </p>


            {/* Statistics */}

            <div className="stats-grid">

              {stats.map((item, index) => (

                <div
                  className="stat-card"
                  key={index}
                >

                  <div className="stat-icon">
                    {item.icon}
                  </div>


                  <h2>
                    {item.count}
                  </h2>


                  <p>
                    {item.title}
                  </p>

                </div>

              ))}

            </div>


            {/* Welcome Card */}

            <div className="welcome-card">

              <h2>
                Customer Dashboard
              </h2>


              <p>
                From here you can:
              </p>


              <ul>

                <li>
                  ✔ Browse available rooms
                </li>

                <li>
                  ✔ View all your bookings
                </li>

                <li>
                  ✔ Complete pending payments
                </li>

                <li>
                  ✔ View booking history
                </li>

              </ul>

            </div>

          </>

        )}


        {/* =================================================
            Profile
        ================================================= */}

        {activePage === "profile" && (

          <div className="profile-card">

            <h2>
              My Profile
            </h2>


            <div className="profile-field">

              <label>
                Full Name
              </label>

              <strong>
                {profile.name}
              </strong>

            </div>


            <div className="profile-field">

              <label>
                Email
              </label>

              <strong>
                {profile.email}
              </strong>

            </div>


            <div className="profile-field">

              <label>
                Phone Number
              </label>

              <strong>
                {profile.phone || "-"}
              </strong>

            </div>


            <div className="profile-field">

              <label>
                Address
              </label>

              <strong>
                {profile.address || "-"}
              </strong>

            </div>

          </div>

        )}


        {/* =================================================
            Browse Rooms
        ================================================= */}

        {activePage === "rooms" && (
          <Rooms
            fromCustomerDashboard={true}
          />
        )}


        {/* =================================================
            My Bookings
        ================================================= */}

        {activePage === "bookings" && (

          <MyBookings />

        )}


      </main>

    </div>

  );

}

export default CustomerDashboard;