import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { toast } from "react-toastify";

import {
  getMyBookings,
  cancelBooking,
} from "../../api/bookingApi";

function MyBookings() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const loadBookings = async () => {

    try {

      setLoading(true);

      const response = await getMyBookings();

      setBookings(response || []);

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to load bookings."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadBookings();

  }, []);

  const filteredBookings = useMemo(() => {

    return bookings.filter((booking) => {

      const roomNumber =
        booking.room?.room_number?.toString() || "";

      const roomType =
        booking.room?.room_type || "";

      return (
        roomNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        roomType
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    });

  }, [bookings, search]);

  const handleCancel = async (bookingId) => {

    if (
      !window.confirm(
        "Are you sure you want to cancel this booking?"
      )
    ) {
      return;
    }

    try {

      await cancelBooking(bookingId);

      toast.success(
        "Booking cancelled successfully."
      );

      loadBookings();

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to cancel booking."
      );

    }

  };

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
        bgcolor: "#F8F9FC",
        minHeight: "100vh",
        py: 5,
      }}
    >

      <Container maxWidth="xl">

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          My Bookings
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          View and manage all your hotel reservations.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by Room Number or Room Type..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
          }}
        />

        <Grid container spacing={4}>
                      {filteredBookings.length === 0 ? (

            <Grid item xs={12}>

              <Card
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >

                <HotelRoundedIcon
                  sx={{
                    fontSize: 80,
                    color: "#D4AF37",
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  No Bookings Found
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1, mb: 4 }}
                >
                  You haven't booked any rooms yet.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() =>
                    navigate("/customer/search-rooms")
                  }
                  sx={{
                    bgcolor: "#D4AF37",
                    color: "#000",

                    "&:hover": {
                      bgcolor: "#C89B1D",
                    },
                  }}
                >
                  Book a Room
                </Button>

              </Card>

            </Grid>

          ) : (

            filteredBookings.map((booking) => (

              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={booking.id}
              >

                <Card
                  elevation={8}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    transition: ".3s",

                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >

                  <Box
                    sx={{
                      height: 220,
                      overflow: "hidden",
                    }}
                  >

                    <img
                      src={
                        booking.room?.image_url ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt="Room"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                  </Box>

                  <CardContent>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >

                      <Typography
                        variant="h5"
                        fontWeight="bold"
                      >
                        Room {booking.room?.room_number}
                      </Typography>

                      <Chip
                        label={booking.status}
                        color={
                          booking.status === "CONFIRMED"
                            ? "success"
                            : booking.status === "CANCELLED"
                            ? "error"
                            : "warning"
                        }
                      />

                    </Stack>

                    <Typography
                      color="text.secondary"
                      gutterBottom
                    >
                      {booking.room?.room_type}
                    </Typography>

                    <Stack spacing={2} mt={3}>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CalendarMonthRoundedIcon
                          color="action"
                        />

                        <Typography>
                          {booking.check_in_date}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CalendarMonthRoundedIcon
                          color="action"
                        />

                        <Typography>
                          {booking.check_out_date}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CurrencyRupeeRoundedIcon
                          sx={{
                            color: "#D4AF37",
                          }}
                        />

                        <Typography
                          fontWeight="bold"
                        >
                          ₹ {booking.total_amount}
                        </Typography>
                      </Stack>

                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      mt={4}
                    >

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                          <VisibilityRoundedIcon />
                        }
                        onClick={() =>
                          navigate(
                            `/customer/booking/${booking.id}`
                          )
                        }
                      >
                        Details
                      </Button>

                      {booking.status !==
                        "CANCELLED" && (
                        <Button
                          fullWidth
                          color="error"
                          variant="contained"
                          startIcon={
                            <CancelRoundedIcon />
                          }
                          onClick={() =>
                            handleCancel(booking.id)
                          }
                        >
                          Cancel
                        </Button>
                      )}

                    </Stack>

                  </CardContent>

                </Card>

              </Grid>

            ))

          )}
                  </Grid>

        {/* ================= Booking Statistics ================= */}

        <Grid
          container
          spacing={3}
          sx={{
            mt: 5,
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#D4AF37"
              >
                {bookings.length}
              </Typography>

              <Typography color="text.secondary">
                Total Bookings
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                color="success.main"
              >
                {
                  bookings.filter(
                    (b) => b.status === "CONFIRMED"
                  ).length
                }
              </Typography>

              <Typography color="text.secondary">
                Confirmed
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                color="warning.main"
              >
                {
                  bookings.filter(
                    (b) =>
                      b.status === "PENDING"
                  ).length
                }
              </Typography>

              <Typography color="text.secondary">
                Pending
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                color="error.main"
              >
                {
                  bookings.filter(
                    (b) =>
                      b.status === "CANCELLED"
                  ).length
                }
              </Typography>

              <Typography color="text.secondary">
                Cancelled
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* ================= Royal Hotel Message ================= */}

        <Card
          elevation={5}
          sx={{
            mt: 5,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <CardContent sx={{ p: 5 }}>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              align="center"
            >
              Thank You for Choosing Royal Hotel
            </Typography>

            <Typography
              align="center"
              sx={{
                color: "#CBD5E1",
                maxWidth: 800,
                mx: "auto",
                mb: 4,
              }}
            >
              We are delighted to host you. Your comfort and
              satisfaction are our highest priorities. You can
              review, manage, or cancel your reservations from
              this page at any time.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#D4AF37",
                  color: "#000",

                  "&:hover": {
                    bgcolor: "#C89B1D",
                  },
                }}
                onClick={() =>
                  navigate("/customer/search-rooms")
                }
              >
                Book Another Room
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",

                  "&:hover": {
                    borderColor: "#D4AF37",
                    color: "#D4AF37",
                  },
                }}
                onClick={() =>
                  navigate("/customer/dashboard")
                }
              >
                Go to Dashboard
              </Button>

            </Stack>

          </CardContent>

        </Card>
              </Container>

    </Box>

  );

}

export default MyBookings;