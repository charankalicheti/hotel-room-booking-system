import React, {useEffect, useMemo, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

import { toast } from "react-toastify";

import { createBooking } from "../../api/bookingApi";

function Booking() {

  const navigate = useNavigate();

  const location = useLocation();

  const room = location.state?.room;

  const roomId = location.state?.roomId;

  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    check_in_date: "",
    check_out_date: "",
    number_of_guests: 1,
  });

  useEffect(() => {

    if (!room) {

      toast.error("Room details not found.");

      navigate("/customer/search-rooms");

    }

  }, [room, navigate]);

  const handleChange = (e) => {

    setBookingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  const totalNights = useMemo(() => {

    if (
      !bookingData.check_in_date ||
      !bookingData.check_out_date
    ) {
      return 0;
    }

    const checkIn = new Date(
      bookingData.check_in_date
    );

    const checkOut = new Date(
      bookingData.check_out_date
    );

    const diff =
      (checkOut - checkIn) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;

  }, [
    bookingData.check_in_date,
    bookingData.check_out_date,
  ]);

  const totalAmount = useMemo(() => {

    return totalNights * Number(room?.price || 0);

  }, [room, totalNights]);

  const handleBooking = async () => {

    if (!bookingData.check_in_date) {

      return toast.error("Select check-in date.");

    }

    if (!bookingData.check_out_date) {

      return toast.error("Select check-out date.");

    }

    if (totalNights <= 0) {

      return toast.error(
        "Check-out date should be after check-in date."
      );

    }

    try {

      setLoading(true);

      const payload = {
        room_id: roomId,
        check_in: bookingData.check_in_date,
        check_out: bookingData.check_out_date,
        guests: Number(bookingData.number_of_guests),
      };

      const response =
        await createBooking(payload);

      toast.success(
        response.message ||
        "Room booked successfully. Proceed to payment."
      );

      navigate(
        "/customer/payments",
        {
          state: {
            booking: response,
          },
        }
      );

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Booking failed."
      );

    } finally {

      setLoading(false);

    }

  };

  if (!room) return null;

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F9FC",
        py: 5,
      }}
    >

      <Container maxWidth="xl">

        <Breadcrumbs sx={{ mb: 4 }}>

          <Button
            startIcon={<HomeRoundedIcon />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>

          <Button
            startIcon={<HotelRoundedIcon />}
            onClick={() =>
              navigate("/customer/search-rooms")
            }
          >
            Rooms
          </Button>

          <Typography color="text.primary">
            Booking
          </Typography>

        </Breadcrumbs>

        <Grid container spacing={4}>
                    {/* ================= Room Summary ================= */}

          <Grid item xs={12} md={5}>

            <Card
              elevation={8}
              sx={{
                borderRadius: 5,
                overflow: "hidden",
                position: "sticky",
                top: 20,
              }}
            >

              <CardMedia
                component="img"
                height="260"
                image={
                  room.image_url ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                }
                alt={room.room_number}
              />

              <CardContent>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                >
                  Room {room.room_number}
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  {room.room_type}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Stack spacing={2}>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography>Price / Night</Typography>

                    <Typography
                      fontWeight="bold"
                      color="#D4AF37"
                    >
                      ₹ {room.price}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography>Capacity</Typography>

                    <Typography fontWeight="bold">
                      {room.capacity} Guests
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography>Floor</Typography>

                    <Typography fontWeight="bold">
                      {room.floor_number}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography>Bed Type</Typography>

                    <Typography fontWeight="bold">
                      {room.bed_type}
                    </Typography>
                  </Stack>

                </Stack>

              </CardContent>

            </Card>

          </Grid>

          {/* ================= Booking Form ================= */}

          <Grid item xs={12} md={7}>

            <Card
              elevation={8}
              sx={{
                borderRadius: 5,
              }}
            >

              <CardContent sx={{ p: 4 }}>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                >
                  Complete Your Booking
                </Typography>

                <Typography
                  color="text.secondary"
                  mb={4}
                >
                  Fill in your booking details to reserve your
                  luxury room.
                </Typography>

                <Grid container spacing={3}>

                  {/* Check In */}

                  <Grid item xs={12} md={6}>

                    <TextField
                      fullWidth
                      label="Check In"
                      type="date"
                      name="check_in_date"
                      value={bookingData.check_in_date}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment:
                          <CalendarMonthRoundedIcon
                            sx={{
                              mr: 1,
                              color: "#D4AF37",
                            }}
                          />,
                      }}
                    />

                  </Grid>

                  {/* Check Out */}

                  <Grid item xs={12} md={6}>

                    <TextField
                      fullWidth
                      label="Check Out"
                      type="date"
                      name="check_out_date"
                      value={bookingData.check_out_date}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment:
                          <CalendarMonthRoundedIcon
                            sx={{
                              mr: 1,
                              color: "#D4AF37",
                            }}
                          />,
                      }}
                    />

                  </Grid>

                  {/* Guests */}

                  <Grid item xs={12}>

                    <TextField
                      fullWidth
                      type="number"
                      label="Number of Guests"
                      name="number_of_guests"
                      value={bookingData.number_of_guests}
                      onChange={handleChange}
                      inputProps={{
                        min: 1,
                        max: room.capacity,
                      }}
                      InputProps={{
                        startAdornment:
                          <PeopleRoundedIcon
                            sx={{
                              mr: 1,
                              color: "#D4AF37",
                            }}
                          />,
                      }}
                    />

                  </Grid>

                  {/* ================= Booking Summary ================= */}

                  <Grid item xs={12}>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Booking Summary
                    </Typography>

                  </Grid>

                  <Grid item xs={12}>

                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 4,
                        bgcolor: "#FAFAFA",
                      }}
                    >

                      <CardContent>

                        <Stack spacing={2}>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography>
                              Room
                            </Typography>

                            <Typography fontWeight="bold">
                              {room.room_type}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography>
                              Room Number
                            </Typography>

                            <Typography fontWeight="bold">
                              {room.room_number}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography>
                              Price / Night
                            </Typography>

                            <Typography fontWeight="bold">
                              ₹ {room.price}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography>
                              Total Nights
                            </Typography>

                            <Typography fontWeight="bold">
                              {totalNights}
                            </Typography>
                          </Stack>

                          <Divider />

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                            >
                              Total Amount
                            </Typography>

                            <Typography
                              variant="h5"
                              fontWeight="bold"
                              color="#D4AF37"
                            >
                              ₹ {totalAmount}
                            </Typography>
                          </Stack>

                        </Stack>

                      </CardContent>

                    </Card>

                  </Grid>

                  <Grid item xs={12}>

                    <Alert severity="info">

                      Please verify your booking details before
                      confirming your reservation. Once your booking
                      is created, you will be redirected to the
                      secure payment page.

                    </Alert>

                  </Grid>

                  <Grid item xs={12}>

                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      spacing={2}
                    >

                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        disabled={
                          loading || totalNights <= 0
                        }
                        onClick={handleBooking}
                        sx={{
                          bgcolor: "#D4AF37",
                          color: "#000",
                          py: 1.6,
                          borderRadius: 3,
                          fontWeight: "bold",

                          "&:hover": {
                            bgcolor: "#C89B1D",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            color="inherit"
                          />
                        ) : (
                          "Book & Pay"
                        )}
                      </Button>

                      <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                          py: 1.6,
                          borderRadius: 3,
                        }}
                      >
                        Back
                      </Button>

                    </Stack>

                  </Grid>

                </Grid>

              </CardContent>

            </Card>

          </Grid>
                  </Grid>

        {/* ================= Booking Information ================= */}

        <Card
          elevation={3}
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
              align="center"
              gutterBottom
            >
              Booking Information
            </Typography>

            <Typography
              align="center"
              sx={{
                color: "#CBD5E1",
                mb: 5,
                maxWidth: 850,
                mx: "auto",
              }}
            >
              We are committed to making your stay comfortable and
              memorable. Please review the following information
              before confirming your reservation.
            </Typography>

            <Grid container spacing={4}>

              <Grid item xs={12} md={4}>

                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <CalendarMonthRoundedIcon
                    sx={{
                      fontSize: 55,
                      color: "#D4AF37",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Flexible Check-In
                  </Typography>

                  <Typography color="text.secondary">
                    Check-in starts from 12:00 PM and check-out is
                    before 11:00 AM. Early check-in is subject to
                    availability.
                  </Typography>

                </Card>

              </Grid>

              <Grid item xs={12} md={4}>

                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%",
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
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Premium Hospitality
                  </Typography>

                  <Typography color="text.secondary">
                    Enjoy luxury rooms, premium amenities, daily
                    housekeeping, and 24×7 customer assistance
                    throughout your stay.
                  </Typography>

                </Card>

              </Grid>

              <Grid item xs={12} md={4}>

                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <PeopleRoundedIcon
                    sx={{
                      fontSize: 55,
                      color: "#D4AF37",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Guest Support
                  </Typography>

                  <Typography color="text.secondary">
                    Need assistance? Our support team is available
                    24/7 to help with reservations, room service,
                    and any special requests.
                  </Typography>

                </Card>

              </Grid>

            </Grid>

          </CardContent>

        </Card>

      </Container>

    </Box>

  );

}

export default Booking;