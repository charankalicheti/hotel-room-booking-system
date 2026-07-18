import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import { toast } from "react-toastify";

import { getRooms } from "../../api/roomApi";

function SearchRooms() {

  const navigate = useNavigate();
  const location = useLocation();

  const searchState = location.state || {};

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [roomType, setRoomType] = useState("All");

  const [availability, setAvailability] = useState("All");

  const [capacity, setCapacity] = useState(
    searchState.guests || "All"
  );

  // ==========================================================
  // Load Rooms
  // ==========================================================

  const loadRooms = async () => {

    try {

      setLoading(true);

      const response = await getRooms();

      setRooms(response);

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to load rooms."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadRooms();

  }, []);

  // ==========================================================
  // Filter Rooms
  // ==========================================================

  const filteredRooms = useMemo(() => {

    return rooms.filter((room) => {

      const matchesSearch =
        search === "" ||
        room.room_number
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        room.room_type
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesRoomType =
        roomType === "All" ||
        room.room_type === roomType;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available"
          ? room.is_available
          : !room.is_available);

      const matchesCapacity =
        capacity === "All" ||
        Number(room.capacity) >= Number(capacity);

      return (
        matchesSearch &&
        matchesRoomType &&
        matchesAvailability &&
        matchesCapacity
      );

    });

  }, [
    rooms,
    search,
    roomType,
    availability,
    capacity,
  ]);

  // ==========================================================
  // Loading
  // ==========================================================

  if (loading) {

    return (

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <CircularProgress
          size={65}
        />

      </Box>

    );

  }

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f8fb",
        py: 6,
      }}
    >

      <Container maxWidth="xl">

        {/* ================= Header ================= */}

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
          Find Your Perfect Room
        </Typography>

        <Typography
          color="text.secondary"
          mt={2}
          mb={5}
        >
          Browse luxury rooms, compare amenities,
          and reserve your stay in just a few clicks.
        </Typography>
                {/* ================= Filters ================= */}

        <Card
          elevation={0}
          sx={{
            p: 3,
            mb: 5,
            borderRadius: 4,
            border: "1px solid #E8EAF0",
          }}
        >
          <Grid container spacing={3} alignItems="center">

            {/* Search */}

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by Room Number or Room Type"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchRoundedIcon
                      sx={{
                        mr: 1,
                        color: "#D4AF37",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            {/* Room Type */}

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>

                <Select
                  value={roomType}
                  label="Room Type"
                  onChange={(e) =>
                    setRoomType(e.target.value)
                  }
                >
                  <MenuItem value="All">All</MenuItem>

                  {[
                    ...new Set(
                      rooms.map((room) => room.room_type)
                    ),
                  ].map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Capacity */}

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Guests</InputLabel>

                <Select
                  value={capacity}
                  label="Guests"
                  onChange={(e) =>
                    setCapacity(e.target.value)
                  }
                >
                  <MenuItem value="All">
                    All
                  </MenuItem>

                  <MenuItem value="1">
                    1+
                  </MenuItem>

                  <MenuItem value="2">
                    2+
                  </MenuItem>

                  <MenuItem value="3">
                    3+
                  </MenuItem>

                  <MenuItem value="4">
                    4+
                  </MenuItem>

                  <MenuItem value="5">
                    5+
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Availability */}

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>

                <Select
                  value={availability}
                  label="Status"
                  onChange={(e) =>
                    setAvailability(e.target.value)
                  }
                >
                  <MenuItem value="All">
                    All
                  </MenuItem>

                  <MenuItem value="Available">
                    Available
                  </MenuItem>

                  <MenuItem value="Booked">
                    Booked
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Reset */}

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setSearch("");
                  setRoomType("All");
                  setAvailability("All");
                  setCapacity("All");
                }}
                sx={{
                  height: 56,
                  bgcolor: "#D4AF37",
                  color: "#000",
                  fontWeight: 700,

                  "&:hover": {
                    bgcolor: "#C89B1D",
                  },
                }}
              >
                Reset
              </Button>
            </Grid>

          </Grid>
        </Card>

        {/* ================= Statistics ================= */}

        <Grid
          container
          spacing={3}
          sx={{
            mb: 5,
          }}
        >
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <HotelRoundedIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: 40,
                }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {filteredRooms.length}
              </Typography>

              <Typography color="text.secondary">
                Rooms Found
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <KingBedRoundedIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: 40,
                }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {
                  filteredRooms.filter(
                    (r) => r.is_available
                  ).length
                }
              </Typography>

              <Typography color="text.secondary">
                Available
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <PeopleRoundedIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: 40,
                }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {Math.max(
                  ...filteredRooms.map(
                    (r) => r.capacity || 0
                  ),
                  0
                )}
              </Typography>

              <Typography color="text.secondary">
                Max Capacity
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <CurrencyRupeeRoundedIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: 40,
                }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                ₹
                {filteredRooms.length
                  ? Math.min(
                      ...filteredRooms.map(
                        (r) => Number(r.price)
                      )
                    )
                  : 0}
              </Typography>

              <Typography color="text.secondary">
                Starting Price
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* ================= Room Cards ================= */}

        <Grid container spacing={4}>
                    {filteredRooms.length === 0 ? (

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
                  gutterBottom
                >
                  No Rooms Found
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Try changing the search filters.
                </Typography>

              </Card>

            </Grid>

          ) : (

            filteredRooms.map((room) => (

              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={room.id}
              >

                <Card
                  elevation={10}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    transition: ".35s",
                    height: "100%",

                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: 15,
                    },
                  }}
                >

                  <CardMedia
                    component="img"
                    height="240"
                    image={
                      room.image_url ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={room.room_number}
                  />

                  <CardContent>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >

                      <Typography
                        variant="h5"
                        fontWeight="bold"
                      >
                        Room {room.room_number}
                      </Typography>

                      <Chip
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
                      />

                    </Box>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      {room.room_type}
                    </Typography>

                    <Rating
                      value={room.rating ?? 4.8}
                      precision={0.5}
                      readOnly
                      sx={{ my: 2 }}
                    />

                    <Typography
                      sx={{
                        mb: 1,
                      }}
                    >
                      👥 Capacity :
                      <b> {room.capacity}</b>
                    </Typography>

                    <Typography
                      sx={{
                        color: "#D4AF37",
                        fontWeight: 800,
                        fontSize: 24,
                        mb: 3,
                      }}
                    >
                      ₹ {room.price}
                      <Typography
                        component="span"
                        color="text.secondary"
                      >
                        {" "}
                        / Night
                      </Typography>
                    </Typography>

                    <Box
                      display="flex"
                      gap={2}
                    >

                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/customer/room/${room.id}`
                          )
                        }
                        sx={{
                          borderRadius: 3,
                          fontWeight: 700,
                        }}
                      >
                        View Details
                      </Button>

                      <Button
                        fullWidth
                        variant="contained"
                        disabled={!room.is_available}
                        onClick={() =>
                          navigate(
                            "/customer/booking",
                            {
                              state: {
                                roomId: room.id,
                                room,
                              },
                            }
                          )
                        }
                        sx={{
                          bgcolor: "#D4AF37",
                          color: "#000",
                          borderRadius: 3,
                          fontWeight: 700,

                          "&:hover": {
                            bgcolor: "#C89B1D",
                          },
                        }}
                      >
                        Book Now
                      </Button>

                    </Box>

                  </CardContent>

                </Card>

              </Grid>

            ))

          )}
                  </Grid>

        {/* ================= Bottom Info ================= */}

        <Box
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 5,
            textAlign: "center",
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Experience Luxury Like Never Before
          </Typography>

          <Typography
            sx={{
              maxWidth: 750,
              mx: "auto",
              color: "#CBD5E1",
              mb: 4,
            }}
          >
            Choose from our premium collection of luxury rooms,
            enjoy world-class hospitality, and make unforgettable
            memories at Royal Hotel.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
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
            Back to Home
          </Button>
        </Box>

      </Container>

    </Box>

  );

}

export default SearchRooms;