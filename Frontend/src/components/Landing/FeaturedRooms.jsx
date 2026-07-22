import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

const rooms = [
  {
    id: 1,
    name: "Luxury Suite",
    price: "₹6,999",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    amenities: ["Free WiFi", "Breakfast", "Pool"],
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: "₹4,999",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    amenities: ["AC", "King Bed", "Parking"],
  },
  {
    id: 3,
    name: "Executive Room",
    price: "₹5,499",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    amenities: ["Spa", "Gym", "Balcony"],
  },
];

export default function FeaturedRooms() {
  return (
    <Box
      id="rooms"
      sx={{
        py: 10,
        background: "#f7f9fc",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          align="center"
          sx={{
            color: "#D4AF37",
            fontWeight: "bold",
            letterSpacing: 2,
          }}
        >
          OUR ROOMS
        </Typography>

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={6}
        >
          Featured Luxury Rooms
        </Typography>

        <Grid container spacing={4}>
          {rooms.map((room) => (
            <Grid item xs={12} md={4} key={room.id}>
              <Card
                sx={{
                  borderRadius: 5,
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={room.image}
                  alt={room.name}
                />

                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {room.name}
                  </Typography>

                  <Rating
                    value={room.rating}
                    precision={0.5}
                    readOnly
                    sx={{ my: 1 }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      color: "#D4AF37",
                      fontWeight: "bold",
                      mb: 2,
                    }}
                  >
                    {room.price} / Night
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      mb: 3,
                    }}
                  >
                    {room.amenities.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </Box>

                  {/* Book Now button removed as requested */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}