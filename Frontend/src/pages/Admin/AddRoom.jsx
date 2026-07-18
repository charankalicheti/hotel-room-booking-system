import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { toast } from "react-toastify";

import { addRoom } from "../../api/roomApi";

function AddRoom() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [room, setRoom] = useState({

    room_number: "",

    room_type: "",

    price: "",

    capacity: "",

    floor_number: "",

    bed_type: "",

    description: "",

    image_url: "",

    ac: true,

    wifi: true,

    tv: true,

    breakfast_included: false,

  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setRoom((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...room,
        price: Number(room.price),
        capacity: Number(room.capacity),
        floor_number: Number(room.floor_number),
      };

      await addRoom(payload);

      toast.success("Room added successfully.");

      navigate("/admin/rooms");

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to create room."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        bgcolor: "#F5F7FA",
        minHeight: "100vh",
        py: 5,
      }}
    >

      <Container maxWidth="lg">

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Add New Room
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/admin/rooms")}
          >
            Back
          </Button>

        </Stack>

        <Card
          elevation={6}
          sx={{
            borderRadius: 4,
          }}
        >

          <CardContent>

            <Box
              component="form"
              onSubmit={handleSubmit}
            >

              <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>

                  <TextField
                    fullWidth
                    label="Room Number"
                    name="room_number"
                    value={room.room_number}
                    onChange={handleChange}
                    required
                  />

                </Grid>

                <Grid item xs={12} md={6}>

                  <TextField
                    fullWidth
                    select
                    label="Room Type"
                    name="room_type"
                    value={room.room_type}
                    onChange={handleChange}
                    required
                  >

                    <MenuItem value="Single">
                      Single
                    </MenuItem>

                    <MenuItem value="Double">
                      Double
                    </MenuItem>

                    <MenuItem value="Deluxe">
                      Deluxe
                    </MenuItem>

                    <MenuItem value="Suite">
                      Suite
                    </MenuItem>

                    <MenuItem value="Executive Suite">
                      Executive Suite
                    </MenuItem>

                    <MenuItem value="Presidential Suite">
                      Presidential Suite
                    </MenuItem>

                  </TextField>

                </Grid>

                <Grid item xs={12} md={6}>

                  <TextField
                    fullWidth
                    type="number"
                    label="Price Per Night"
                    name="price"
                    value={room.price}
                    onChange={handleChange}
                    required
                  />

                </Grid>

                <Grid item xs={12} md={6}>

                  <TextField
                    fullWidth
                    type="number"
                    label="Capacity"
                    name="capacity"
                    value={room.capacity}
                    onChange={handleChange}
                    required
                  />

                </Grid>

                <Grid item xs={12} md={6}>

                  <TextField
                    fullWidth
                    type="number"
                    label="Floor Number"
                    name="floor_number"
                    value={room.floor_number}
                    onChange={handleChange}
                    required
                  />

                </Grid>

                <Grid item xs={12} md={6}>

                  <TextField
                    fullWidth
                    select
                    label="Bed Type"
                    name="bed_type"
                    value={room.bed_type}
                    onChange={handleChange}
                    required
                  >

                    <MenuItem value="Single">
                      Single
                    </MenuItem>

                    <MenuItem value="Double">
                      Double
                    </MenuItem>

                    <MenuItem value="Queen">
                      Queen
                    </MenuItem>

                    <MenuItem value="King">
                      King
                    </MenuItem>

                    <MenuItem value="Twin">
                      Twin
                    </MenuItem>

                  </TextField>

                </Grid>

                <Grid item xs={12} md={3}>

                  <TextField
                    fullWidth
                    select
                    label="Air Conditioning"
                    name="ac"
                    value={room.ac}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        ac: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>

                </Grid>

                <Grid item xs={12} md={3}>

                  <TextField
                    fullWidth
                    select
                    label="WiFi"
                    name="wifi"
                    value={room.wifi}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        wifi: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>

                </Grid>

                <Grid item xs={12} md={3}>

                  <TextField
                    fullWidth
                    select
                    label="Smart TV"
                    name="tv"
                    value={room.tv}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        tv: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>

                </Grid>

                <Grid item xs={12} md={3}>

                  <TextField
                    fullWidth
                    select
                    label="Breakfast Included"
                    name="breakfast_included"
                    value={room.breakfast_included}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        breakfast_included: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>

                </Grid>

                <Grid item xs={12}>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Room Description"
                    name="description"
                    value={room.description}
                    onChange={handleChange}
                    placeholder="Describe the room, facilities, and features..."
                  />

                </Grid>

                <Grid item xs={12}>

                  <TextField
                    fullWidth
                    label="Room Image URL"
                    name="image_url"
                    value={room.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/room.jpg"
                  />

                </Grid>
                                {/* ================= Image Preview ================= */}

                {room.image_url && (

                  <Grid item xs={12}>

                    <Card
                      elevation={3}
                      sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >

                      <Box
                        component="img"
                        src={room.image_url}
                        alt="Room Preview"
                        sx={{
                          width: "100%",
                          height: 350,
                          objectFit: "cover",
                        }}
                      />

                    </Card>

                  </Grid>

                )}

                {/* ================= Room Summary ================= */}

                <Grid item xs={12} md={6}>

                  <Card
                    elevation={4}
                    sx={{
                      borderRadius: 4,
                      height: "100%",
                    }}
                  >

                    <CardContent>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Room Summary
                      </Typography>

                      <Stack spacing={2} mt={2}>

                        <Typography>
                          <b>Room Number :</b>{" "}
                          {room.room_number || "-"}
                        </Typography>

                        <Typography>
                          <b>Room Type :</b>{" "}
                          {room.room_type || "-"}
                        </Typography>

                        <Typography>
                          <b>Price :</b>{" "}
                          {room.price
                            ? `₹${room.price}`
                            : "-"}
                        </Typography>

                        <Typography>
                          <b>Capacity :</b>{" "}
                          {room.capacity || "-"}
                        </Typography>

                        <Typography>
                          <b>Floor :</b>{" "}
                          {room.floor_number || "-"}
                        </Typography>

                        <Typography>
                          <b>Bed Type :</b>{" "}
                          {room.bed_type || "-"}
                        </Typography>

                      </Stack>

                    </CardContent>

                  </Card>

                </Grid>

                {/* ================= Guidelines ================= */}

                <Grid item xs={12} md={6}>

                  <Card
                    elevation={4}
                    sx={{
                      borderRadius: 4,
                      height: "100%",
                      bgcolor: "#FFF8E7",
                    }}
                  >

                    <CardContent>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Room Guidelines
                      </Typography>

                      <Stack spacing={2} mt={2}>

                        <Typography>
                          • Room number should be unique.
                        </Typography>

                        <Typography>
                          • Enter the nightly room price.
                        </Typography>

                        <Typography>
                          • Toggle AC, WiFi, TV, and breakfast as needed.
                        </Typography>

                        <Typography>
                          • Use a high-quality room image URL.
                        </Typography>

                        <Typography>
                          • Keep the room availability updated.
                        </Typography>

                      </Stack>

                    </CardContent>

                  </Card>

                </Grid>

                {/* ================= Description Preview ================= */}

                <Grid item xs={12}>

                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 4,
                    }}
                  >

                    <CardContent>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Description Preview
                      </Typography>

                      <Typography color="text.secondary">

                        {room.description
                          ? room.description
                          : "Room description will appear here as you type."}

                      </Typography>

                    </CardContent>

                  </Card>

                </Grid>
                                {/* ================= Action Buttons ================= */}

                <Grid item xs={12}>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{
                      mt: 2,
                    }}
                  >

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<ArrowBackRoundedIcon />}
                      onClick={() => navigate("/admin/rooms")}
                      disabled={loading}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SaveRoundedIcon />}
                      disabled={loading}
                      sx={{
                        bgcolor: "#D4AF37",
                        color: "#000",
                        px: 5,

                        "&:hover": {
                          bgcolor: "#C89B1D",
                        },
                      }}
                    >
                      {loading ? "Saving..." : "Save Room"}
                    </Button>

                  </Stack>

                </Grid>

              </Grid>

            </Box>

          </CardContent>

        </Card>

        {/* ================= Footer ================= */}

        <Box
          sx={{
            mt: 5,
            textAlign: "center",
          }}
        >

          <Typography
            variant="body2"
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
            Add new rooms with complete details including pricing,
            amenities, availability, and images for customers.
          </Typography>

        </Box>

      </Container>

    </Box>

  );

}

export default AddRoom;