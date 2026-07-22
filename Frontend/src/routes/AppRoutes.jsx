import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Common/Landing";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import ProtectedRoute from "./ProtectedRoute";

// ==========================================================
// Customer Pages
// ==========================================================

import CustomerDashboard from "../pages/Customer/Dashboard";
import SearchRooms from "../pages/Customer/SearchRooms";
import RoomDetails from "../pages/Customer/RoomDetails";
import Booking from "../pages/Customer/Booking";
import BookingHistory from "../pages/Customer/BookingHistory";
import Payments from "../pages/Customer/Payments";
import PaymentInvoice from "../pages/Customer/PaymentInvoice";
import Profile from "../pages/Customer/Profile";

// ==========================================================
// Admin Pages
// ==========================================================

import AdminDashboard from "../pages/Admin/Dashboard";
import Rooms from "../pages/Admin/Rooms";
import AddRoom from "../pages/Admin/AddRoom";
import Customers from "../pages/Admin/Customers";
import Reservations from "../pages/Admin/Reservations";
import AdminPayments from "../pages/Admin/Payments";
import Reports from "../pages/Admin/Reports";
import WalkInBooking from "../pages/Admin/WalkInBooking";

function AppRoutes() {

  return (

    <Routes>

      {/* ========================================================== */}
      {/* Public Routes */}
      {/* ========================================================== */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/auth/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/auth/register"
        element={<Register />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* ========================================================== */}
      {/* Landing Page Links */}
      {/* ========================================================== */}

      <Route
        path="/rooms"
        element={<Landing />}
      />

      <Route
        path="/gallery"
        element={<Landing />}
      />

      <Route
        path="/about"
        element={<Landing />}
      />

      <Route
        path="/contact"
        element={<Landing />}
      />

      {/* ========================================================== */}
      {/* Customer Routes */}
      {/* ========================================================== */}

      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/search-rooms"
        element={
          <ProtectedRoute role="customer">
            <SearchRooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/room/:id"
        element={
          <ProtectedRoute role="customer">
            <RoomDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/booking"
        element={
          <ProtectedRoute role="customer">
            <Booking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/booking-history"
        element={
          <ProtectedRoute role="customer">
            <BookingHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/payments"
        element={
          <ProtectedRoute role="customer">
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/payment-invoice/:reservationId"
        element={
          <ProtectedRoute role="customer">
            <PaymentInvoice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute role="customer">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ========================================================== */}
      {/* Admin Routes */}
      {/* ========================================================== */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rooms"
        element={
          <ProtectedRoute role="admin">
            <Rooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rooms/add"
        element={
          <ProtectedRoute role="admin">
            <AddRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rooms/:id"
        element={
          <ProtectedRoute role="admin">
            <AddRoom mode="view" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rooms/edit/:id"
        element={
          <ProtectedRoute role="admin">
            <AddRoom mode="edit" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute role="admin">
            <Customers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reservations"
        element={
          <ProtectedRoute role="admin">
            <Reservations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute role="admin">
            <AdminPayments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/walk-in"
        element={
          <ProtectedRoute role="admin">
            <WalkInBooking />
          </ProtectedRoute>
        }
      />

      <Route
  path="/admin/reports"
  element={
    <ProtectedRoute role="admin">
      <Reports />
    </ProtectedRoute>
  }
/>

    </Routes>

  );

}

export default AppRoutes;