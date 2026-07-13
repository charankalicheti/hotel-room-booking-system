import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Rooms from "../pages/Rooms/Rooms";

import Booking from "../pages/Booking/Booking";
import Payment from "../pages/Payment/Payment";
import CustomerDashboard from "../pages/CustomerDashboard/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import BookingSummary from "../pages/BookingSummary/BookingSummary";
import BookingSuccess from "../pages/BookingSuccess/BookingSuccess";
import MyBookings from "../pages/MyBookings/MyBookings";
import BookingDetails from "../pages/BookingDetails/BookingDetails";

import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {

  return (

    <Routes>


      {/* =====================================================
          Public Routes
      ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      {/* Public Room View */}

      <Route
        path="/rooms"
        element={<Rooms />}
      />


      {/* =====================================================
          Customer Protected Routes
      ===================================================== */}

      <Route
        path="/room-details/:id"
        element={
          <ProtectedRoute role="customer">
            <RoomDetails />
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking"
        element={
          <ProtectedRoute role="customer">
            <Booking />
          </ProtectedRoute>
        }
      />


      <Route
        path="/payment"
        element={
          <ProtectedRoute role="customer">
            <Payment />
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking-summary"
        element={
          <ProtectedRoute role="customer">
            <BookingSummary />
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking-success"
        element={
          <ProtectedRoute role="customer">
            <BookingSuccess />
          </ProtectedRoute>
        }
      />


      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute role="customer">
            <MyBookings />
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking-history"
        element={
          <ProtectedRoute role="customer">
            <MyBookings />
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking-details/:id"
        element={
          <ProtectedRoute role="customer">
            <BookingDetails />
          </ProtectedRoute>
        }
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


      {/* =====================================================
          Admin Protected Routes
      ===================================================== */}

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