import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Hotels from "../pages/Hotels/Hotels";
import Rooms from "../pages/Rooms/Rooms";
import Booking from "../pages/Booking/Booking";
import Payment from "../pages/Payment/Payment";
import CustomerDashboard from "../pages/CustomerDashboard/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import ProtectedRoute from "./ProtectedRoute";
import BookingSummary from "../pages/BookingSummary/BookingSummary";
import BookingSuccess from "../pages/BookingSuccess/BookingSuccess";
import MyBookings from "../pages/MyBookings/MyBookings";
import BookingDetails from "../pages/BookingDetails/BookingDetails";  

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/room-details" element={<RoomDetails />} />

      {/* Protected Routes */}
      <Route
        path="/booking"
        element={<Booking />}
      />

      <Route
        path="/payment"
        element={<Payment />}
      />

      <Route
        path="/booking-summary"
        element={<BookingSummary />}
      />

      <Route
        path="/booking-success"
        element={<BookingSuccess />}
      />

      {/* My Bookings */}
      <Route
        path="/my-bookings"
        element={<MyBookings />}
      />

      {/* Booking History (same page as My Bookings) */}
      <Route
        path="/booking-history"
        element={<MyBookings />}
      />
      <Route
        path="/booking-details/:id"
        element={<BookingDetails />}
      />

      {/* Customer Dashboard */}
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;