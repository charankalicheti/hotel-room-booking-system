import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    specialRequest: "",
  });

  const [errors, setErrors] = useState({});

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
    let newErrors = {};

    // Full Name
    if (!booking.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email
    if (!booking.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(booking.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Phone Number
    if (!booking.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(booking.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    // Check-In
    if (!booking.checkIn) {
      newErrors.checkIn = "Select Check-In Date";
    }

    // Check-Out
    if (!booking.checkOut) {
      newErrors.checkOut = "Select Check-Out Date";
    }

    // Date Validation
    if (
      booking.checkIn &&
      booking.checkOut &&
      booking.checkOut <= booking.checkIn
    ) {
      newErrors.checkOut =
        "Check-Out must be after Check-In";
    }

    // Guests
    if (!booking.guests) {
      newErrors.guests = "Select number of guests";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Navigate to Booking Summary Page
    navigate("/booking-summary", {
      state: booking,
    });
  };

  return (
    <div className="booking-container">
      <div className="booking-card">

        <h1>Book Your Stay</h1>

        <p>Please fill in your booking details.</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={booking.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="error">{errors.fullName}</p>
          )}

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={booking.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="error">{errors.email}</p>
          )}

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={booking.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="error">{errors.phone}</p>
          )}

          <label>Check-In Date</label>
          <input
            type="date"
            name="checkIn"
            value={booking.checkIn}
            onChange={handleChange}
          />
          {errors.checkIn && (
            <p className="error">{errors.checkIn}</p>
          )}

          <label>Check-Out Date</label>
          <input
            type="date"
            name="checkOut"
            value={booking.checkOut}
            onChange={handleChange}
          />
          {errors.checkOut && (
            <p className="error">{errors.checkOut}</p>
          )}

          <label>Guests</label>
          <select
            name="guests"
            value={booking.guests}
            onChange={handleChange}
          >
            <option value="">Select Guests</option>
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