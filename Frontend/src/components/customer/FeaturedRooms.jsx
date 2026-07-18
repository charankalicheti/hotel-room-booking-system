import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";

import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import { useNavigate } from "react-router-dom";

const rooms = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
    type: "Luxury Suite",
    price: 7999,
    description:
      "King Size Bed • Ocean View • Free Breakfast",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    type: "Deluxe Room",
    price: 4999,
    description:
      "Queen Bed • Balcony • WiFi Included",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    type: "Executive Room",
    price: 5999,
    description:
      "Business Lounge • City View • Breakfast",
  },
];

function FeaturedRooms() {

  const navigate = useNavigate();

  return (
    <Box mt={6} mb={6}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        Featured Rooms
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Discover our most popular luxury accommodations.
      </Typography>

      <Grid container spacing={3}>

        {rooms.map((room) => (

          <Grid
            item
            xs={12}
            md={4}
            key={room.id}
          >

            <Card
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >

              <CardMedia
                component="img"
                height="230"
                image={room.image}
              />

              <CardContent>

                <Chip
                  label="Popular"
                  color="warning"
                  sx={{ mb: 2 }}
                />

                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  {room.type}
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={1}
                >
                  {room.description}
                </Typography>

                <Typography
                  variant="h5"
                  mt={3}
                  color="primary"
                  fontWeight="bold"
                >
                  ₹{room.price} / Night
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<HotelRoundedIcon />}
                  sx={{
                    mt: 3,
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
                  Book Now
                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>
  );
}

export default FeaturedRooms;