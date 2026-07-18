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
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { toast } from "react-toastify";

import {
  getRooms,
  deleteRoom,
} from "../../api/roomApi";

function Rooms() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState([]);

  const [search, setSearch] = useState("");

  const loadRooms = async () => {

    try {

      setLoading(true);

      const response = await getRooms();

      setRooms(response || []);

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

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this room?"))
      return;

    try {

      await deleteRoom(id);

      toast.success("Room deleted successfully.");

      loadRooms();

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to delete room."
      );

    }

  };

  const filteredRooms = rooms.filter((room) =>

    room.room_number
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    room.room_type
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

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
        bgcolor: "#F5F7FA",
        minHeight: "100vh",
        py: 5,
      }}
    >

      <Container maxWidth="xl">

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          spacing={2}
          mb={4}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Room Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() =>
              navigate("/admin/rooms/add")
            }
            sx={{
              bgcolor: "#D4AF37",
              color: "#000",

              "&:hover": {
                bgcolor: "#C89B1D",
              },
            }}
          >
            Add Room
          </Button>

        </Stack>

        <Card
          sx={{
            mb: 4,
            borderRadius: 3,
          }}
        >

          <CardContent>

            <TextField
              fullWidth
              placeholder="Search by Room Number or Room Type..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <SearchRoundedIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                ),
              }}
            />

          </CardContent>

        </Card>

        <Grid container spacing={3}>
                    {filteredRooms.length === 0 ? (

            <Grid item xs={12}>

              <Card
                sx={{
                  p: 6,
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >

                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  No Rooms Found
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={1}
                >
                  Try searching with another room number or room type.
                </Typography>

              </Card>

            </Grid>

          ) : (

            filteredRooms.map((room) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={room.id}
              >

                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: ".3s",

                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >

                  <Box
                    component="img"
                    src={
                      room.image_url ||
                      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
                    }
                    alt={room.room_type}
                    sx={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                    }}
                  />

                  <CardContent>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      Room {room.room_number}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      gutterBottom
                    >
                      {room.room_type}
                    </Typography>

                    <Stack
                      spacing={1}
                      mt={2}
                    >

                      <Typography>
                        <b>Price :</b> ₹{room.price}
                      </Typography>

                      <Typography>
                        <b>Capacity :</b> {room.capacity}
                      </Typography>

                      <Typography>
                        <b>Floor :</b>{" "}
                        {room.floor_number ?? "-"}
                      </Typography>

                    </Stack>

                    <Box mt={2}>

                      <Chip
                        label={
                          room.is_available
                            ? "Available"
                            : "Occupied"
                        }
                        color={
                          room.is_available
                            ? "success"
                            : "error"
                        }
                      />

                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      mt={3}
                      justifyContent="space-between"
                    >

                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(
                            `/admin/rooms/${room.id}`
                          )
                        }
                      >
                        <VisibilityRoundedIcon />
                      </IconButton>

                      <IconButton
                        color="warning"
                        onClick={() =>
                          navigate(
                            `/admin/rooms/edit/${room.id}`
                          )
                        }
                      >
                        <EditRoundedIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(room.id)
                        }
                      >
                        <DeleteRoundedIcon />
                      </IconButton>

                    </Stack>

                  </CardContent>

                </Card>

              </Grid>

            ))

          )}

        </Grid>
                {/* ================= Room Statistics ================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mt: 6,
            mb: 3,
          }}
        >
          Room Statistics
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>

            <Card
              elevation={5}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
              }}
            >

              <Typography
                variant="h3"
                fontWeight="bold"
                color="primary"
              >
                {rooms.length}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
              >
                Total Rooms
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} md={4}>

            <Card
              elevation={5}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
              }}
            >

              <Typography
                variant="h3"
                fontWeight="bold"
                color="success.main"
              >
                {
                  rooms.filter(
                    (room) => room.is_available
                  ).length
                }
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
              >
                Available Rooms
              </Typography>

            </Card>

          </Grid>

          <Grid item xs={12} md={4}>

            <Card
              elevation={5}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
              }}
            >

              <Typography
                variant="h3"
                fontWeight="bold"
                color="error.main"
              >
                {
                  rooms.filter(
                    (room) => !room.is_available
                  ).length
                }
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
              >
                Occupied Rooms
              </Typography>

            </Card>

          </Grid>

        </Grid>

        {/* ================= Information Banner ================= */}

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
            }}
          >

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Room Management Center
            </Typography>

            <Typography
              sx={{
                color: "#CBD5E1",
                mb: 4,
              }}
            >
              Easily manage your hotel's room inventory. Add new rooms,
              update room details, monitor availability, and keep your
              accommodation data organized from one centralized dashboard.
            </Typography>

            <Grid container spacing={3}>

              <Grid item xs={12} md={4}>

                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                  }}
                >

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    {rooms.length}
                  </Typography>

                  <Typography color="text.secondary">
                    Total Inventory
                  </Typography>

                </Card>

              </Grid>

              <Grid item xs={12} md={4}>

                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                  }}
                >

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {
                      rooms.filter(
                        (room) => room.is_available
                      ).length
                    }
                  </Typography>

                  <Typography color="text.secondary">
                    Ready to Book
                  </Typography>

                </Card>

              </Grid>

              <Grid item xs={12} md={4}>

                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                  }}
                >

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="warning.main"
                  >
                    {
                      rooms.filter(
                        (room) => !room.is_available
                      ).length
                    }
                  </Typography>

                  <Typography color="text.secondary">
                    Currently Occupied
                  </Typography>

                </Card>

              </Grid>

            </Grid>

          </CardContent>

        </Card>
                {/* ================= Footer ================= */}

        <Box
          sx={{
            mt: 6,
            py: 4,
            textAlign: "center",
          }}
        >

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Royal Hotel Management System
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            Manage rooms efficiently with a modern and responsive
            administration panel built using React, Material UI,
            and FastAPI.
          </Typography>

        </Box>

      </Container>

    </Box>

  );

}

export default Rooms;