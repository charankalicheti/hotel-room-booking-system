import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "../../services/bookingService";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const room = state?.room;
  const selectedCheckIn = state?.checkIn || "";
  const selectedCheckOut = state?.checkOut || "";
  const selectedGuests = state?.guests || 1;

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [booking, setBooking] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    checkIn: selectedCheckIn,
    checkOut: selectedCheckOut,
    guests: String(selectedGuests),
    specialRequest: "",
  });

  const [errors, setErrors] = useState({});

  if (!room) {
    return <h2>No Room Selected</h2>;
  }

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!booking.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!booking.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        booking.email
      )
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!booking.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(booking.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    if (!booking.checkIn) {
      newErrors.checkIn = "Check-In Date is required";
    }

    if (!booking.checkOut) {
      newErrors.checkOut = "Check-Out Date is required";
    }

    if (
      booking.checkIn &&
      booking.checkOut &&
      booking.checkOut <= booking.checkIn
    ) {
      newErrors.checkOut =
        "Check-Out must be after Check-In";
    }

    if (!booking.guests) {
      newErrors.guests = "Select number of guests";
    }

    if (Number(booking.guests) > Number(room.capacity)) {
      newErrors.guests =
        `Maximum ${room.capacity} guests allowed for this room`;
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const bookingData = {
        customer_name: booking.fullName,
        room_number: room.roomNumber,
        check_in: booking.checkIn,
        check_out: booking.checkOut,
        guests: Number(booking.guests),
      };

      console.log("Booking Request:", bookingData);

      const response = await createBooking(bookingData);

      console.log("Booking Created:", response);

      navigate("/booking-summary", {
        state: {
          booking: response,
          room,
          customerDetails: {
            fullName: booking.fullName,
            email: booking.email,
            phone: booking.phone,
            specialRequest: booking.specialRequest,
          },
        },
      });
    } catch (error) {
      console.error("Booking Error:", error);

      alert(
        error.response?.data?.detail ||
          "Unable to create booking."
      );
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card">

        <h1>Book Your Stay</h1>

        <p>Please review your booking details.</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={booking.fullName}
            readOnly
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={booking.email}
            readOnly
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={booking.phone}
            readOnly
          />

          <label>Check-In Date</label>
          <input
            type="date"
            name="checkIn"
            value={booking.checkIn}
            readOnly
          />
          {errors.checkIn && (
            <p className="error">{errors.checkIn}</p>
          )}

          <label>Check-Out Date</label>
          <input
            type="date"
            name="checkOut"
            value={booking.checkOut}
            readOnly
          />
          {errors.checkOut && (
            <p className="error">{errors.checkOut}</p>
          )}

          <label>Guests</label>
          <select
            name="guests"
            value={booking.guests}
            disabled
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
          </select>

          {errors.guests && (
            <p className="error">{errors.guests}</p>
          )}

          <label>Special Requests</label>
          <textarea
            rows="4"
            name="specialRequest"
            placeholder="Any special requests?"
            value={booking.specialRequest}
            onChange={handleChange}
          />

          <button type="submit">
            Continue
          </button>

        </form>

      </div>
    </div>
  );
}

export default Booking;