import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fade,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  HotelRounded,
} from "@mui/icons-material";

import { toast } from "react-toastify";

import { loginCustomer } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await loginCustomer(
        formData.email,
        formData.password
      );

      login(response.access_token, response);

      toast.success("Login Successful");

      if (response.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage:
        "linear-gradient(rgba(255,255,255,.18),rgba(255,255,255,.18)),url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      p: 3,
    }}
  >
    <Fade in timeout={900}>
      <Paper
        elevation={0}
        sx={{
          width: 460,
          borderRadius: 6,
          p: 5,
          background: "rgba(255,255,255,.88)",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,.18)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack
            spacing={3}
            alignItems="center"
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                bgcolor: "#D4AF37",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow:
                  "0 12px 35px rgba(212,175,55,.45)",
              }}
            >
              <HotelRounded
                sx={{
                  color: "#fff",
                  fontSize: 45,
                }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              color="#1E293B"
            >
              Royal Hotel
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
            >
              Welcome Back
              <br />
              Sign in to continue your luxury stay
            </Typography>

            <TextField
              fullWidth
              required
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined
                      sx={{
                        color: "#D4AF37",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fff",
                },
              }}
            />

            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined
                      sx={{
                        color: "#D4AF37",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fff",
                },
              }}
            />
                        <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    sx={{
                      color: "#D4AF37",
                      "&.Mui-checked": {
                        color: "#D4AF37",
                      },
                    }}
                  />
                }
                label="Remember Me"
              />

              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                sx={{
                  color: "#D4AF37",
                  fontWeight: 700,
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.8,
                borderRadius: 3,
                bgcolor: "#D4AF37",
                color: "#fff",
                fontWeight: 700,
                fontSize: 17,
                textTransform: "none",

                "&:hover": {
                  bgcolor: "#bf951d",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Login"
              )}
            </Button>

            <Button
              component={RouterLink}
              to="/"
              variant="outlined"
              fullWidth
              sx={{
                py: 1.6,
                borderRadius: 3,
                borderColor: "#D4AF37",
                color: "#D4AF37",
                fontWeight: 700,
                textTransform: "none",

                "&:hover": {
                  borderColor: "#bf951d",
                  bgcolor: "#FFF8E6",
                },
              }}
            >
              ← Back to Home
            </Button>

            <Typography
              sx={{
                color: "#666",
                fontSize: 15,
              }}
            >
              Don't have an account?
            </Typography>

            <Link
              component={RouterLink}
              to="/register"
              underline="none"
              sx={{
                color: "#D4AF37",
                fontWeight: 700,
                fontSize: 17,

                "&:hover": {
                  color: "#bf951d",
                },
              }}
            >
              Create Account
            </Link>

          </Stack>
        </Box>
      </Paper>
    </Fade>
  </Box>
);
}