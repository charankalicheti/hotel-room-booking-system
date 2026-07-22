import React, {useState} from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Fade,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import {
  HotelRounded,
  Person,
  EmailOutlined,
  PhoneOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  ArrowBack,
} from "@mui/icons-material";

import { toast } from "react-toastify";
import { registerCustomer } from "../../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
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

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!formData.agree) {
      toast.error(
        "Please accept Terms & Conditions."
      );
      return;
    }

    try {
      setLoading(true);

      const customer = {
  name: `${formData.firstName} ${formData.lastName}`,
  email: formData.email,
  phone: formData.phone,
  password: formData.password,
  confirm_password: formData.confirmPassword,
  role: "customer",
};

      const response =
        await registerCustomer(customer);

      toast.success(
        response.message ||
          "OTP sent successfully."
      );

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(8,15,30,.55),rgba(8,15,30,.55)),url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Fade in timeout={900}>
          <Paper
            elevation={24}
            sx={{
              overflow: "hidden",
              borderRadius: 6,
              backdropFilter: "blur(18px)",
              bgcolor: "rgba(255,255,255,.96)",
            }}
          >
            <Grid container>
                            {/* LEFT SIDE */}

              <Grid
                size={{ xs: 12, md: 5 }}
                sx={{
                  position: "relative",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 6,
                  color: "#fff",
                  minHeight: 760,
                  backgroundImage:
                    "linear-gradient(rgba(15,23,42,.70),rgba(15,23,42,.45)),url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1500')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box>
                  <HotelRounded
                    sx={{
                      fontSize: 60,
                      color: "#D4AF37",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h3"
                    fontWeight={800}
                    mb={2}
                  >
                    Royal Hotel
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={3}
                  >
                    Luxury Begins Here
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 17,
                      lineHeight: 2,
                      color: "#ECECEC",
                    }}
                  >
                    Create your account to unlock premium
                    rooms, exclusive member discounts,
                    faster reservations, personalized
                    services and unforgettable luxury stays.
                  </Typography>
                </Box>

                <Box>

                  <Typography
                    sx={{
                      fontSize: 17,
                      mb: 2,
                    }}
                  >
                    ⭐ Luxury Suites
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 17,
                      mb: 2,
                    }}
                  >
                    ⭐ Infinity Pool
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 17,
                      mb: 2,
                    }}
                  >
                    ⭐ Fine Dining Restaurant
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 17,
                      mb: 2,
                    }}
                  >
                    ⭐ Spa & Wellness Center
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 17,
                    }}
                  >
                    ⭐ 24×7 Concierge Service
                  </Typography>

                </Box>

              </Grid>

              {/* RIGHT SIDE */}

              <Grid
                size={{ xs: 12, md: 7 }}
                sx={{
                  p: {
                    xs: 4,
                    md: 7,
                  },
                }}
              >

                <Button
                  component={RouterLink}
                  to="/"
                  startIcon={<ArrowBack />}
                  sx={{
                    color: "#555",
                    mb: 4,
                    textTransform: "none",
                  }}
                >
                  Back to Home
                </Button>

                <Typography
                  variant="h3"
                  fontWeight={800}
                  color="#1E293B"
                >
                  Create Account
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    mt: 1,
                    mb: 5,
                  }}
                >
                  Join Royal Hotel and enjoy premium
                  hospitality with secure online booking.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                >

                  <Stack spacing={3}>

                    {/* First Name & Last Name */}

                    <Grid
                      container
                      spacing={3}
                    >

                      <Grid
                        size={{
                          xs: 12,
                          md: 6,
                        }}
                      >
                        <TextField
                          fullWidth
                          required
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              bgcolor: "#FAFAFA",
                            },
                          }}
                        />
                      </Grid>

                      <Grid
                        size={{
                          xs: 12,
                          md: 6,
                        }}
                      >
                        <TextField
                          fullWidth
                          required
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              bgcolor: "#FAFAFA",
                            },
                          }}
                        />
                      </Grid>

                    </Grid>

                    {/* Email */}

                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#FAFAFA",
                        },
                      }}
                    />

                    {/* Phone */}

                    <TextField
                      fullWidth
                      required
                      label="Mobile Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneOutlined color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#FAFAFA",
                        },
                      }}
                    />
                                        {/* Password & Confirm Password */}

                    <Grid container spacing={3}>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Password"
                          name="password"
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
                                <LockOutlined color="action" />
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
                              bgcolor: "#FAFAFA",
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Confirm Password"
                          name="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlined color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowConfirmPassword(
                                      !showConfirmPassword
                                    )
                                  }
                                >
                                  {showConfirmPassword ? (
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
                              bgcolor: "#FAFAFA",
                            },
                          }}
                        />
                      </Grid>

                    </Grid>

                    {/* Terms */}

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agree"
                          checked={formData.agree}
                          onChange={handleChange}
                          sx={{
                            color: "#D4AF37",
                            "&.Mui-checked": {
                              color: "#D4AF37",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color: "#64748B",
                            fontSize: 15,
                          }}
                        >
                          I agree to the Terms &
                          Conditions and Privacy
                          Policy
                        </Typography>
                      }
                    />

                    {/* Register Button */}

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={
                        loading ||
                        !formData.agree
                      }
                      sx={{
                        mt: 1,
                        py: 1.8,
                        fontSize: 17,
                        fontWeight: 700,
                        borderRadius: 3,
                        bgcolor: "#D4AF37",
                        textTransform: "none",
                        boxShadow:
                          "0 10px 25px rgba(212,175,55,.35)",

                        "&:hover": {
                          bgcolor: "#C89A18",
                          transform:
                            "translateY(-2px)",
                          boxShadow:
                            "0 14px 30px rgba(212,175,55,.45)",
                        },

                        transition: ".3s",
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
                        "Create Account"
                      )}
                    </Button>

                    {/* Divider */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        my: 4,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          height: 1,
                          bgcolor: "#E2E8F0",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#94A3B8",
                          fontWeight: 600,
                        }}
                      >
                        OR
                      </Typography>

                      <Box
                        sx={{
                          flex: 1,
                          height: 1,
                          bgcolor: "#E2E8F0",
                        }}
                      />
                    </Box>

                    {/* Login */}

                    <Typography
                      align="center"
                      sx={{
                        color: "#64748B",
                        fontSize: 16,
                      }}
                    >
                      Already have an account?{" "}
                      <Typography
                        component={RouterLink}
                        to="/login"
                        sx={{
                          display: "inline",
                          color: "#D4AF37",
                          textDecoration: "none",
                          fontWeight: 700,

                          "&:hover": {
                            textDecoration:
                              "underline",
                          },
                        }}
                      >
                        Sign In
                      </Typography>
                    </Typography>

                  </Stack>

                </Box>

              </Grid>

            </Grid>

          </Paper>

        </Fade>

      </Container>

    </Box>
  );
}