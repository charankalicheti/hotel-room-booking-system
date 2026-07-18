import { useEffect, useState } from "react";

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

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

import { toast } from "react-toastify";

import {

  getReservations,

  checkIn,

  checkOut,

} from "../../api/receptionApi";

function Reservations() {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {

    try {

      setLoading(true);

      const response = await getReservations();

      setBookings(response);

    } catch (error) {

      toast.error(

        error.response?.data?.detail ||

        "Unable to load reservations."

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadBookings();

  }, []);

  const statusColor = (status) =>
    status === "CHECKED_IN"
      ? "success"
      : status === "CHECKED_OUT"
      ? "default"
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
        bgcolor: "#F5F7FA",
        minHeight: "100vh",
        py: 6,
      }}
    >

      <Container maxWidth="xl">

        <Typography
          sx={{
            color: "#D4AF37",
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Royal Hotel · Admin
        </Typography>

        <Typography
          variant="h3"
          fontWeight={800}
          mt={1}
          mb={1}
        >
          Reservation Management
        </Typography>

        <Typography
          color="text.secondary"
          mb={5}
        >
          Track guest reservations and manage check-in / check-out.
        </Typography>

        <Grid
          container
          spacing={3}
        >
          {bookings.length === 0 ? (

            <Grid item xs={12}>

              <Card
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >
                <EventAvailableRoundedIcon
                  sx={{ fontSize: 70, color: "#D4AF37", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  No reservations found.
                </Typography>
              </Card>

            </Grid>

          ) : (

            bookings.map((booking) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={booking.id}
              >

                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    overflow: "hidden",
                    transition: ".3s",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 10,
                    },
                  }}
                >

                  <Box
                    sx={{
                      bgcolor: "#0F172A",
                      color: "#fff",
                      px: 2.5,
                      py: 1.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                    >
                      Booking #{booking.id}
                    </Typography>

                    <Chip
                      size="small"
                      label={booking.status}
                      color={statusColor(booking.status)}
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>

                  <CardContent>

                    <Stack spacing={1.3}>

                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <PersonRoundedIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
                        <Typography variant="body2">
                          {booking.customer_name}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <HotelRoundedIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
                        <Typography variant="body2">
                          Room {booking.room_id}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <PeopleRoundedIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
                        <Typography variant="body2">
                          {booking.guests} Guests
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <CalendarMonthRoundedIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
                        <Typography variant="body2">
                          {booking.check_in} → {booking.check_out}
                        </Typography>
                      </Stack>

                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction="row"
                      spacing={1}
                    >

                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<LoginRoundedIcon />}
                        disabled={
                          booking.status ===
                          "CHECKED_IN"
                        }
                        onClick={async () => {

                          try {

                            await checkIn(
                              booking.id
                            );

                            toast.success(
                              "Customer checked in successfully."
                            );

                            loadBookings();

                          } catch (error) {

                            toast.error(

                              error.response?.data?.detail ||

                              "Unable to check in."

                            );

                          }

                        }}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                      >

                        Check In

                      </Button>

                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        color="warning"
                        startIcon={<LogoutRoundedIcon />}
                        disabled={
                          booking.status ===
                          "CHECKED_OUT"
                        }
                        onClick={async () => {

                          try {

                            await checkOut(
                              booking.id
                            );

                            toast.success(
                              "Customer checked out successfully."
                            );

                            loadBookings();

                          } catch (error) {

                            toast.error(

                              error.response?.data?.detail ||

                              "Unable to check out."

                            );

                          }

                        }}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                      >

                        Check Out

                      </Button>

                    </Stack>

                  </CardContent>

                </Card>

              </Grid>

            ))

          )}

        </Grid>

      </Container>

    </Box>

  );

}

export default Reservations;
