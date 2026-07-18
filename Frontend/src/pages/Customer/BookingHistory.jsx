import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { toast } from "react-toastify";

import {
  getMyBookings,
  cancelBooking,
} from "../../api/bookingApi";

function BookingHistory() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // Load My Bookings
  // ==========================================================

  const loadBookings = async () => {

    try {

      setLoading(true);

      const response = await getMyBookings();

      setBookings(response);

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

  // ==========================================================
  // Cancel Booking
  // ==========================================================

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

  const statusColor = (status) =>
    status === "CONFIRMED"
      ? "success"
      : status === "CANCELLED"
      ? "error"
      : "warning";

  if (loading) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >

        <CircularProgress
          size={60}
          sx={{ color: "#D4AF37" }}
        />

      </Box>

    );

  }

  return (

    <Box
      sx={{
        bgcolor: "#F8F9FC",
        minHeight: "100vh",
        py: 6,
      }}
    >

      <Container maxWidth="lg">

        <Typography
          sx={{
            color: "#D4AF37",
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Royal Hotel
        </Typography>

        <Typography
          variant="h3"
          fontWeight={800}
          mt={1}
        >
          My Booking History
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
          mb={5}
        >
          A complete record of all your reservations at Royal Hotel.
        </Typography>

        <Grid container spacing={4}>

          {bookings.length === 0 ? (

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
                  You haven't made any reservations yet.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() =>
                    navigate("/customer/search-rooms")
                  }
                  sx={{
                    bgcolor: "#D4AF37",
                    color: "#000",
                    fontWeight: 700,
                    borderRadius: 3,

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

            bookings.map((booking) => (

              <Grid
                item
                xs={12}
                md={6}
                key={booking.id}
              >

                <Card
                  elevation={8}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    transition: ".3s",
                    height: "100%",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 12,
                    },
                  }}
                >

                  <Box
                    sx={{
                      bgcolor: "#0F172A",
                      color: "#fff",
                      px: 3,
                      py: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Booking #{booking.id}
                    </Typography>

                    <Chip
                      label={booking.status}
                      color={statusColor(booking.status)}
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3 }}>

                    <Stack spacing={2}>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <HotelRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          <b>Room ID :</b> {booking.room_id}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <PeopleRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          <b>Guests :</b> {booking.guests}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <CalendarMonthRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          <b>Check In :</b> {booking.check_in}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <CalendarMonthRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          <b>Check Out :</b> {booking.check_out}
                        </Typography>
                      </Stack>

                    </Stack>

                    <Divider sx={{ my: 2.5 }} />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CurrencyRupeeRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          ₹ {booking.total_price}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      mt={3}
                    >

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EditRoundedIcon />}
                        onClick={() =>
                          navigate(
                            "/customer/booking",
                            {
                              state: {
                                booking,
                              },
                            }
                          )
                        }
                        sx={{
                          borderRadius: 3,
                          fontWeight: 700,
                        }}
                      >
                        Update
                      </Button>

                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        startIcon={<CancelRoundedIcon />}
                        disabled={
                          booking.status === "CANCELLED"
                        }
                        onClick={() =>
                          handleCancel(booking.id)
                        }
                        sx={{
                          borderRadius: 3,
                          fontWeight: 700,
                        }}
                      >
                        Cancel
                      </Button>

                    </Stack>

                  </CardContent>

                </Card>

              </Grid>

            ))

          )}

        </Grid>

        {/* ================= Bottom Info ================= */}

        <Card
          elevation={3}
          sx={{
            mt: 6,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <CardContent sx={{ p: 5, textAlign: "center" }}>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Manage Your Stays With Ease
            </Typography>

            <Typography
              sx={{
                maxWidth: 750,
                mx: "auto",
                color: "#CBD5E1",
                mb: 4,
              }}
            >
              Review your past and upcoming stays, update your
              reservations, or cancel a booking anytime right from
              this page.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate("/customer/search-rooms")
              }
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,

                "&:hover": {
                  bgcolor: "#C89B1D",
                },
              }}
            >
              Book Another Room
            </Button>

          </CardContent>

        </Card>

      </Container>

    </Box>

  );

}

export default BookingHistory;
