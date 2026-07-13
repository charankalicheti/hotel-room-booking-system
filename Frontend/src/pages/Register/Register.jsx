import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Full Name
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    // Address
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await registerUser({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        password: form.password,
        role: "customer",
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>
        <p>Register to book your hotel easily.</p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
            />

            {errors.fullName && (
              <small className="error">{errors.fullName}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {errors.email && (
              <small className="error">{errors.email}</small>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            {errors.phone && (
              <small className="error">{errors.phone}</small>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>

            <textarea
              rows="4"
              placeholder="House No, Street, Area, City, State, Pincode"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            {errors.address && (
              <small className="error">
                {errors.address}
              </small>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          <button type="submit">
            Register
          </button>

        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;