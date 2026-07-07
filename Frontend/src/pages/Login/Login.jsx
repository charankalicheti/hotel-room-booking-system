import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import {
  loginUser,
  getProfile,
} from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // Login API
      const response = await loginUser(
        form.email,
        form.password
      );

      console.log("Login Response:", response);

      // Save Token
      localStorage.setItem(
        "token",
        response.access_token
      );

      // Get Profile
      const profile = await getProfile();

      console.log("Profile Response:", profile);

      const userData = {
        ...profile,
        token: response.access_token,
      };

      console.log("User Data:", userData);

      // Save in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      console.log(
        "Stored User:",
        JSON.parse(localStorage.getItem("user"))
      );

      // Save in Context
      login(userData);

      alert("Login Successful");

      if (profile.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        console.log("API Error:", error.response.data);
      }

      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back</h2>

        <p>Please login to your account</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            {errors.email && (
              <small className="error">
                {errors.email}
              </small>
            )}

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            {errors.password && (
              <small className="error">
                {errors.password}
              </small>
            )}

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;