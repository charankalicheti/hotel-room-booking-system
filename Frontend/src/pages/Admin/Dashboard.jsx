import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import hero from "../../assets/images/hero/hero.jpg";

import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { toast } from "react-toastify";

import {
  getAdminDashboard,
} from "../../api/adminApi";

function Dashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    total_rooms: 0,
    total_bookings: 0,
    total_customers: 0,
    total_revenue: 0,
  });

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const response =
        await getAdminDashboard();

      setDashboard(response);

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to load dashboard."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDashboard();

  }, []);

  if (loading) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >

        <CircularProgress
          sx={{
            color: "#D4AF37",
          }}
        />

      </Box>

    );

  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          `linear-gradient(135deg, rgba(2,6,23,0.92) 0%, rgba(15,23,42,0.72) 45%, rgba(30,41,59,0.78) 100%), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: 5,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top left, rgba(212,175,55,0.24), transparent 35%), radial-gradient(circle at bottom right, rgba(124,58,237,0.18), transparent 30%)",
          pointerEvents: "none",
        },
      }}
    >

      <Container maxWidth="xl">

        <Card
          elevation={8}
          sx={{
            borderRadius: 5,
            mb: 5,
            backgroundImage:
              "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))",
            color: "#fff",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 30px 80px rgba(2,6,23,0.35)",
            position: "relative",
            overflow: "hidden",
            transform: "translateY(-4px)",
          }}
        >

          <CardContent
            sx={{
              p: 5,
            }}
          >

            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              alignItems="center"
            >

              <Box>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  Admin Dashboard
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#CBD5E1",
                  }}
                >
                  Monitor rooms, bookings,
                  customers and payments
                  from one place.
                </Typography>

              </Box>

              <Avatar
                sx={{
                  bgcolor: "#D4AF37",
                  width: 90,
                  height: 90,
                }}
              >

                <AdminPanelSettingsRoundedIcon
                  sx={{
                    color: "#000",
                    fontSize: 55,
                  }}
                />

              </Avatar>

            </Stack>

          </CardContent>

        </Card>

        <Grid container spacing={3} sx={{ position: "relative", zIndex: 2 }}>
          <Grid item xs={12} sm={6} md={3}>

            <Card
              elevation={4}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,247,237,0.9))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 45px rgba(15,23,42,0.16)",
                transform: "translateY(8px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 26px 55px rgba(15,23,42,0.22)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -24,
                  right: -24,
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "rgba(212,175,55,0.14)",
                },
              }}
            >

              <HotelRoundedIcon
                sx={{
                  fontSize: 55,
                  color: "#D4AF37",
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight="bold"
              >
                {dashboard.total_rooms}
              </Typography>

              <Typography color="text.secondary">
                Total Rooms
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} sm={6} md={3}>

            <Card
              elevation={4}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,255,0.95))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 45px rgba(15,23,42,0.16)",
                transform: "translateY(16px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(6px)",
                  boxShadow: "0 26px 55px rgba(15,23,42,0.22)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: -20,
                  left: -18,
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "rgba(25,118,210,0.14)",
                },
              }}
            >

              <BookOnlineRoundedIcon
                sx={{
                  fontSize: 55,
                  color: "#1976D2",
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight="bold"
                color="primary"
              >
                {dashboard.total_bookings}
              </Typography>

              <Typography color="text.secondary">
                Total Bookings
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} sm={6} md={3}>

            <Card
              elevation={4}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,253,244,0.95))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 45px rgba(15,23,42,0.16)",
                transform: "translateY(24px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(12px)",
                  boxShadow: "0 26px 55px rgba(15,23,42,0.22)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -18,
                  left: -18,
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "rgba(46,125,50,0.14)",
                },
              }}
            >

              <PeopleRoundedIcon
                sx={{
                  fontSize: 55,
                  color: "#2E7D32",
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight="bold"
                color="success.main"
              >
                {dashboard.total_customers}
              </Typography>

              <Typography color="text.secondary">
                Total Customers
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} sm={6} md={3}>

            <Card
              elevation={4}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,247,237,0.95))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 45px rgba(15,23,42,0.16)",
                transform: "translateY(32px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(18px)",
                  boxShadow: "0 26px 55px rgba(15,23,42,0.22)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: -18,
                  right: -20,
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "rgba(239,108,0,0.14)",
                },
              }}
            >

              <PaymentsRoundedIcon
                sx={{
                  fontSize: 55,
                  color: "#EF6C00",
                  mb: 2,
                }}
              />

              <Typography
                variant="h3"
                fontWeight="bold"
                color="warning.main"
              >
                ₹{dashboard.total_revenue}
              </Typography>

              <Typography color="text.secondary">
                Total Revenue
              </Typography>

            </Card>

          </Grid>

        </Grid>

        {/* ================= Quick Actions ================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mt: 6,
            mb: 3,
          }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={3} sx={{ position: "relative", zIndex: 2 }}>

          <Grid item xs={12} md={3}>

            <Card
              onClick={() => navigate("/admin/rooms")}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                cursor: "pointer",
                background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
                boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                border: "1px solid rgba(15,23,42,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px) translateX(2px)",
                  boxShadow: "0 30px 55px rgba(15,23,42,0.18)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto auto",
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)",
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: "auto -16px -16px auto",
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "rgba(15,23,42,0.04)",
                  pointerEvents: "none",
                },
              }}
            >

              <HotelRoundedIcon
                sx={{
                  fontSize: 50,
                  color: "#D4AF37",
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Manage Rooms
              </Typography>

              <Typography
                color="text.secondary"
                mb={3}
              >
                Add, edit and remove hotel rooms.
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} md={3}>

            <Card
              onClick={() => navigate("/admin/reservations")}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                cursor: "pointer",
                background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
                boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                border: "1px solid rgba(15,23,42,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px) translateX(2px)",
                  boxShadow: "0 30px 55px rgba(15,23,42,0.18)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto auto",
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(25,118,210,0.14), transparent 70%)",
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: "auto -16px -16px auto",
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "rgba(15,23,42,0.04)",
                  pointerEvents: "none",
                },
              }}
            >

              <BookOnlineRoundedIcon
                sx={{
                  fontSize: 50,
                  color: "#1976D2",
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Manage Bookings
              </Typography>

              <Typography
                color="text.secondary"
                mb={3}
              >
                View, approve and cancel reservations.
              </Typography>

            </Card>

          </Grid>
                    <Grid item xs={12} md={3}>

            <Card
              onClick={() => navigate("/admin/customers")}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                cursor: "pointer",
                background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
                boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                border: "1px solid rgba(15,23,42,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px) translateX(2px)",
                  boxShadow: "0 30px 55px rgba(15,23,42,0.18)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto auto",
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(46,125,50,0.16), transparent 70%)",
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: "auto -16px -16px auto",
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "rgba(15,23,42,0.04)",
                  pointerEvents: "none",
                },
              }}
            >

              <PeopleRoundedIcon
                sx={{
                  fontSize: 50,
                  color: "#2E7D32",
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Manage Customers
              </Typography>

              <Typography
                color="text.secondary"
                mb={3}
              >
                View customer profiles and booking history.
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} md={3}>

            <Card
              onClick={() => navigate("/admin/payments")}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                cursor: "pointer",
                background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
                boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                border: "1px solid rgba(15,23,42,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px) translateX(2px)",
                  boxShadow: "0 30px 55px rgba(15,23,42,0.18)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto auto",
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(239,108,0,0.16), transparent 70%)",
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: "auto -16px -16px auto",
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "rgba(15,23,42,0.04)",
                  pointerEvents: "none",
                },
              }}
            >

              <PaymentsRoundedIcon
                sx={{
                  fontSize: 50,
                  color: "#EF6C00",
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Manage Payments
              </Typography>

              <Typography
                color="text.secondary"
                mb={3}
              >
                Review payment transactions and revenue.
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} md={3}>

            <Card
              onClick={() => navigate("/admin/walk-in")}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
                cursor: "pointer",
                background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
                boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                border: "1px solid rgba(15,23,42,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px) translateX(2px)",
                  boxShadow: "0 30px 55px rgba(15,23,42,0.18)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto auto",
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent 70%)",
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: "auto -16px -16px auto",
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "rgba(15,23,42,0.04)",
                  pointerEvents: "none",
                },
              }}
            >

              <PersonAddAltRoundedIcon
                sx={{
                  fontSize: 50,
                  color: "#7C3AED",
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Walk-in Booking
              </Typography>

              <Typography
                color="text.secondary"
                mb={3}
              >
                Create bookings for direct hotel arrivals.
              </Typography>

            </Card>

          </Grid>

        </Grid>

        {/* ================= Recent Activity ================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mt: 6,
            mb: 3,
          }}
        >
          Recent Activity
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={8}>

            <Card
              elevation={5}
              sx={{
                borderRadius: 4,
                p: 3,
              }}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Latest System Updates
              </Typography>

              <Stack spacing={2} mt={2}>

                <Box>
                  <Typography fontWeight="bold">
                    🏨 New Room Added
                  </Typography>

                  <Typography color="text.secondary">
                    Deluxe Suite Room has been added to inventory.
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight="bold">
                    📅 Booking Confirmed
                  </Typography>

                  <Typography color="text.secondary">
                    A new reservation has been confirmed today.
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight="bold">
                    💳 Payment Received
                  </Typography>

                  <Typography color="text.secondary">
                    Customer payment was successfully completed.
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight="bold">
                    👤 New Customer Registered
                  </Typography>

                  <Typography color="text.secondary">
                    A new customer account has been created.
                  </Typography>
                </Box>

              </Stack>

            </Card>

          </Grid>

          <Grid item xs={12} md={4}>

            <Card
              elevation={5}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                height: "100%",
              }}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Hotel Summary
              </Typography>

              <Stack
                spacing={3}
                mt={3}
              >

                <Box>

                  <Typography
                    variant="h4"
                    color="primary"
                    fontWeight="bold"
                  >
                    {dashboard.total_rooms}
                  </Typography>

                  <Typography color="text.secondary">
                    Available Rooms
                  </Typography>

                </Box>

                <Box>

                  <Typography
                    variant="h4"
                    color="success.main"
                    fontWeight="bold"
                  >
                    {dashboard.total_bookings}
                  </Typography>

                  <Typography color="text.secondary">
                    Active Bookings
                  </Typography>

                </Box>

                <Box>

                  <Typography
                    variant="h4"
                    color="warning.main"
                    fontWeight="bold"
                  >
                    ₹{dashboard.total_revenue}
                  </Typography>

                  <Typography color="text.secondary">
                    Total Revenue
                  </Typography>

                </Box>

              </Stack>

            </Card>

          </Grid>

        </Grid>
                {/* ================= Administration Banner ================= */}

        <Card
          elevation={8}
          sx={{
            mt: 6,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >

          <CardContent
            sx={{
              p: 5,
              textAlign: "center",
            }}
          >

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Royal Hotel Administration
            </Typography>

            <Typography
              sx={{
                color: "#CBD5E1",
                maxWidth: 850,
                mx: "auto",
                mb: 4,
              }}
            >
              Welcome to the Royal Hotel Admin Panel. Manage rooms,
              reservations, customers, and payments efficiently from
              one centralized dashboard. Stay updated with hotel
              operations and deliver an exceptional guest experience.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="center"
            >

              <Card
                sx={{
                  bgcolor: "#D4AF37",
                  color: "#000",
                  px: 4,
                  py: 2,
                  minWidth: 180,
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {dashboard.total_rooms}
                </Typography>

                <Typography variant="body2">
                  Rooms
                </Typography>

              </Card>

              <Card
                sx={{
                  bgcolor: "#1976D2",
                  color: "#fff",
                  px: 4,
                  py: 2,
                  minWidth: 180,
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {dashboard.total_bookings}
                </Typography>

                <Typography variant="body2">
                  Bookings
                </Typography>

              </Card>

              <Card
                sx={{
                  bgcolor: "#2E7D32",
                  color: "#fff",
                  px: 4,
                  py: 2,
                  minWidth: 180,
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {dashboard.total_customers}
                </Typography>

                <Typography variant="body2">
                  Customers
                </Typography>

              </Card>

              <Card
                sx={{
                  bgcolor: "#EF6C00",
                  color: "#fff",
                  px: 4,
                  py: 2,
                  minWidth: 180,
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  ₹{dashboard.total_revenue}
                </Typography>

                <Typography variant="body2">
                  Revenue
                </Typography>

              </Card>

            </Stack>

          </CardContent>

        </Card>

        {/* ================= Footer ================= */}

        <Box
          sx={{
            mt: 6,
            py: 3,
            textAlign: "center",
          }}
        >

          <Typography
            variant="body2"
            color="text.secondary"
          >
            © {new Date().getFullYear()} Royal Hotel Management System
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Designed with ❤️ using React, Material UI and FastAPI
          </Typography>

        </Box>

      </Container>

    </Box>

  );

}

export default Dashboard;