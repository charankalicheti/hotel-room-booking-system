import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MyBookings.css";

import {
  getCustomerBookings,
  cancelBooking,
} from "../../services/bookingService";


function MyBookings() {

  // =====================================================
  // States
  // =====================================================

  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState("ALL");

  const navigate = useNavigate();


  // =====================================================
  // Logged-In User
  // =====================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );


  // =====================================================
  // Load Bookings
  // =====================================================

  useEffect(() => {

    if (user?.id) {
      loadBookings();
    }

  }, []);


  const loadBookings = async () => {

    try {

      const data = await getCustomerBookings(
        user.id
      );

      setBookings(data);

    } catch (error) {

      console.error(
        "Unable to load bookings:",
        error
      );

      alert("Unable to load bookings.");

    }

  };


  // =====================================================
  // Cancel Booking
  // =====================================================

  const handleCancelBooking = async (
    bookingId
  ) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }


    try {

      await cancelBooking(bookingId);

      alert(
        "Booking cancelled successfully."
      );

      await loadBookings();

    } catch (error) {

      console.error(
        "Cancel Booking Error:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Unable to cancel booking."
      );

    }

  };


  // =====================================================
  // Proceed To Payment
  // =====================================================

  const handlePayment = (booking) => {

    navigate("/payment", {

      state: {

        booking,

        room: {

          id: booking.room_id,

          roomNumber:
            booking.room_number ||
            booking.room_id,

          price: booking.total_price,

        },

      },

    });

  };


  // =====================================================
  // Filter Bookings
  // =====================================================

  const filteredBookings = bookings.filter(
    (booking) => {

      if (activeTab === "ALL") {
        return true;
      }


      if (activeTab === "UPCOMING") {

        return booking.status === "BOOKED";

      }


      if (activeTab === "PENDING") {

        return booking.status === "PENDING";

      }


      if (activeTab === "HISTORY") {

        return (
          booking.status === "CANCELLED" ||
          booking.status === "COMPLETED" ||
          booking.status === "EXPIRED"
        );

      }


      return true;

    }
  );


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="bookings-container">


      {/* =================================================
          Page Heading
      ================================================= */}

      <h1>My Bookings</h1>


      {/* =================================================
          Booking Tabs
      ================================================= */}

      <div className="booking-tabs">


        <button
          className={
            activeTab === "ALL"
              ? "tab-btn active-tab"
              : "tab-btn"
          }
          onClick={() =>
            setActiveTab("ALL")
          }
        >
          All ({bookings.length})
        </button>


        <button
          className={
            activeTab === "UPCOMING"
              ? "tab-btn active-tab"
              : "tab-btn"
          }
          onClick={() =>
            setActiveTab("UPCOMING")
          }
        >
          Upcoming (
          {
            bookings.filter(
              (booking) =>
                booking.status === "BOOKED"
            ).length
          }
          )
        </button>


        <button
          className={
            activeTab === "PENDING"
              ? "tab-btn active-tab"
              : "tab-btn"
          }
          onClick={() =>
            setActiveTab("PENDING")
          }
        >
          Pending (
          {
            bookings.filter(
              (booking) =>
                booking.status === "PENDING"
            ).length
          }
          )
        </button>


        <button
          className={
            activeTab === "HISTORY"
              ? "tab-btn active-tab"
              : "tab-btn"
          }
          onClick={() =>
            setActiveTab("HISTORY")
          }
        >
          History (
          {
            bookings.filter(
              (booking) =>
                booking.status === "CANCELLED" ||
                booking.status === "COMPLETED" ||
                booking.status === "EXPIRED"
            ).length
          }
          )
        </button>


      </div>


      {/* =================================================
          Booking Grid
      ================================================= */}

      <div className="booking-grid">


        {filteredBookings.length === 0 ? (

          <h2>No Bookings Found</h2>

        ) : (

          filteredBookings.map((booking) => (


            <div
              className="booking-card"
              key={booking.id}
            >


              {/* Hotel */}

              <h3>
                {booking.hotel ||
                  booking.hotel_name ||
                  "Hotel"}
              </h3>


              {/* Booking ID */}

              <p>

                <strong>
                  Booking ID:
                </strong>{" "}

                {booking.id}

              </p>


              {/* Room */}

              <p>

                <strong>
                  Room:
                </strong>{" "}

                {booking.room_number ||
                  booking.room_id}

              </p>


              {/* Check-In */}

              <p>

                <strong>
                  Check-In:
                </strong>{" "}

                {booking.check_in}

              </p>


              {/* Check-Out */}

              <p>

                <strong>
                  Check-Out:
                </strong>{" "}

                {booking.check_out}

              </p>


              {/* Guests */}

              <p>

                <strong>
                  Guests:
                </strong>{" "}

                {booking.guests}

              </p>


              {/* Total Amount */}

              <p>

                <strong>
                  Total Amount:
                </strong>{" "}

                ₹
                {Number(
                  booking.total_price || 0
                ).toLocaleString("en-IN")}

              </p>


              {/* Status */}

              <p>

                <strong>
                  Status:
                </strong>


                <span
                  className={

                    booking.status === "CANCELLED"

                      ? "status cancelled"

                      : booking.status === "COMPLETED"

                      ? "status completed"

                      : booking.status === "PENDING"

                      ? "status pending"

                      : booking.status === "EXPIRED"

                      ? "status expired"

                      : booking.status === "BOOKED"

                      ? "status booked"

                      : "status"

                  }
                >

                  {booking.status}

                </span>

              </p>


              {/* =================================================
                  Expired Message
              ================================================= */}

              {booking.status === "EXPIRED" && (

                <p className="expired-message">

                  ⚠️ Room booked by another
                  customer for the selected dates.

                </p>

              )}


              {/* =================================================
                  Buttons
              ================================================= */}

              <div className="button-group">


                {/* View Details */}

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/booking-details/${booking.id}`
                    )
                  }
                >

                  View Details

                </button>


                {/* =================================================
                    Pay Now
                    Only Pending Booking
                ================================================= */}

                {booking.status === "PENDING" && (

                  <button
                    className="pay-btn"
                    onClick={() =>
                      handlePayment(booking)
                    }
                  >

                    Pay Now

                  </button>

                )}


                {/* =================================================
                    Paid
                    Confirmed Booking
                ================================================= */}

                {booking.status === "BOOKED" && (

                  <button
                    className="paid-btn"
                    disabled
                  >

                    ✓ Paid

                  </button>

                )}


                {/* =================================================
                    Cancel Booking
                ================================================= */}

                {booking.status !== "EXPIRED" && (

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      handleCancelBooking(
                        booking.id
                      )
                    }
                    disabled={
                      booking.status === "CANCELLED" ||
                      booking.status === "COMPLETED"
                    }
                  >

                    {
                      booking.status === "CANCELLED"

                        ? "Cancelled"

                        : booking.status === "COMPLETED"

                        ? "Completed"

                        : "Cancel Booking"
                    }

                  </button>

                )}


              </div>


            </div>


          ))

        )}


      </div>


    </div>

  );

}


export default MyBookings;