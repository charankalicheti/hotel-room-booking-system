import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { toast } from "react-toastify";

import { getRoomDetails } from "../../api/roomApi";

function RoomDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // Load Room Details
  // ==========================================================

  const loadRoom = async () => {
    try {
      setLoading(true);

      const response = await getRoomDetails(id);

      setRoom(response);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Unable to load room details."
      );

      navigate("/customer/search-rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoom();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="85vh"
      >
        <CircularProgress
          size={65}
          sx={{
            color: "#D4AF37",
          }}
        />
      </Box>
    );
  }

  if (!room) return null;

  return (
    <Box
      sx={{
        bgcolor: "#F8F9FC",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="xl">

        {/* ================= Breadcrumb ================= */}

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
            Room {room.room_number}
          </Typography>
        </Breadcrumbs>

        {/* ================= Hero Card ================= */}

        <Card
          elevation={8}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            mb: 5,
          }}
        >
          <Grid container>
                        {/* ================= Room Image ================= */}

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    room.image_url ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80"
                  }
                  alt={room.room_number}
                  sx={{
                    minHeight: 550,
                    objectFit: "cover",
                  }}
                />

                <Chip
                  icon={
                    room.is_available ? (
                      <CheckCircleRoundedIcon />
                    ) : (
                      <CancelRoundedIcon />
                    )
                  }
                  label={
                    room.is_available
                      ? "Available"
                      : "Booked"
                  }
                  color={
                    room.is_available
                      ? "success"
                      : "error"
                  }
                  sx={{
                    position: "absolute",
                    top: 25,
                    right: 25,
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Grid>

            {/* ================= Room Information ================= */}

            <Grid item xs={12} md={5}>
              <CardContent
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  Room {room.room_number}
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  mb={2}
                >
                  {room.room_type}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  mb={3}
                >
                  <Rating
                    value={room.rating ?? 4.8}
                    precision={0.5}
                    readOnly
                  />

                  <Typography color="text.secondary">
                    ({room.rating ?? "4.8"})
                  </Typography>
                </Stack>

                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "#FFF8E6",
                    mb: 4,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#D4AF37",
                        color: "#000",
                      }}
                    >
                      <CurrencyRupeeRoundedIcon />
                    </Avatar>

                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                      >
                        ₹ {room.price}
                      </Typography>

                      <Typography
                        color="text.secondary"
                      >
                        Per Night
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>

                <Grid container spacing={2}>

                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >
                      <PeopleRoundedIcon
                        sx={{
                          color: "#D4AF37",
                          fontSize: 40,
                        }}
                      />

                      <Typography
                        fontWeight="bold"
                        mt={1}
                      >
                        {room.capacity}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Guests
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >
                      <KingBedRoundedIcon
                        sx={{
                          color: "#D4AF37",
                          fontSize: 40,
                        }}
                      />

                      <Typography
                        fontWeight="bold"
                        mt={1}
                      >
                        {room.bed_type}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Bed Type
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >
                      <HotelRoundedIcon
                        sx={{
                          color: "#D4AF37",
                          fontSize: 40,
                        }}
                      />

                      <Typography
                        fontWeight="bold"
                        mt={1}
                      >
                        {room.floor_number}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Floor
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >
                      <Rating
                        value={room.rating ?? 4.8}
                        readOnly
                      />

                      <Typography
                        fontWeight="bold"
                        mt={1}
                      >
                        {room.rating ?? 4.8}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Rating
                      </Typography>
                    </Paper>
                  </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />
                                {/* ================= Amenities ================= */}

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                >
                  Room Amenities
                </Typography>

                <Grid
                  container
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  {room.ac && (
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <AcUnitRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          Air Conditioning
                        </Typography>
                      </Paper>
                    </Grid>
                  )}

                  {room.wifi && (
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <WifiRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          Free WiFi
                        </Typography>
                      </Paper>
                    </Grid>
                  )}

                  {room.tv && (
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <TvRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          Smart TV
                        </Typography>
                      </Paper>
                    </Grid>
                  )}

                  {room.breakfast_included && (
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <RestaurantRoundedIcon
                          sx={{ color: "#D4AF37" }}
                        />
                        <Typography>
                          Breakfast Included
                        </Typography>
                      </Paper>
                    </Grid>
                  )}
                </Grid>

                {/* ================= Description ================= */}

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                >
                  Description
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.9,
                    mb: 4,
                  }}
                >
                  {room.description ||
                    "Enjoy a luxurious stay with spacious interiors, premium amenities, elegant furnishings, and exceptional hospitality. Every room is thoughtfully designed to provide maximum comfort for business and leisure travelers alike."}
                </Typography>

                {/* ================= Availability ================= */}

                <Paper
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: room.is_available
                      ? "#E8F5E9"
                      : "#FDECEC",
                    mb: 4,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    {room.is_available ? (
                      <CheckCircleRoundedIcon
                        color="success"
                      />
                    ) : (
                      <CancelRoundedIcon
                        color="error"
                      />
                    )}

                    <Typography
                      fontWeight="bold"
                    >
                      {room.is_available
                        ? "This room is available for booking."
                        : "This room is currently unavailable."}
                    </Typography>
                  </Stack>
                </Paper>

                {/* ================= Action Buttons ================= */}

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                  mt="auto"
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled={!room.is_available}
                    onClick={() =>
                      navigate("/customer/booking", {
                        state: {
                          roomId: room.id,
                          room,
                        },
                      })
                    }
                    sx={{
                      bgcolor: "#D4AF37",
                      color: "#000",
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: 3,

                      "&:hover": {
                        bgcolor: "#C89B1D",
                      },
                    }}
                  >
                    Book Now
                  </Button>

                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    startIcon={
                      <ArrowBackRoundedIcon />
                    }
                    onClick={() =>
                      navigate(
                        "/customer/search-rooms"
                      )
                    }
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                    }}
                  >
                    Back to Rooms
                  </Button>
                </Stack>

              </CardContent>

            </Grid>

          </Grid>

        </Card>
                {/* ================= Why Choose Royal Hotel ================= */}

        <Paper
          elevation={3}
          sx={{
            mt: 5,
            p: 5,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            Why Choose Royal Hotel?
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "#CBD5E1",
              mb: 5,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Experience world-class hospitality with luxurious rooms,
            modern amenities, exceptional service, and unforgettable
            comfort designed for both business and leisure travelers.
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                }}
              >
                <WifiRoundedIcon
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
                  High-Speed WiFi
                </Typography>

                <Typography color="text.secondary">
                  Stay connected with complimentary high-speed internet
                  throughout your stay.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                }}
              >
                <RestaurantRoundedIcon
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
                  Fine Dining
                </Typography>

                <Typography color="text.secondary">
                  Enjoy delicious cuisine prepared by our experienced
                  chefs with complimentary breakfast options.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
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
                  Luxury Stay
                </Typography>

                <Typography color="text.secondary">
                  Elegant interiors, premium bedding, spacious rooms,
                  and outstanding hospitality await you.
                </Typography>
              </Paper>
            </Grid>

          </Grid>
        </Paper>

      </Container>

    </Box>

  );

}

export default RoomDetails;