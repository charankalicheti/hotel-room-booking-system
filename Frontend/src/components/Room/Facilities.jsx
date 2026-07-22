import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

import pool from "../assets/images/facilities/pool.jpg";
import restaurant from "../assets/images/facilities/restaurant.jpg";
import spa from "../assets/images/facilities/spa.jpg";
import gym from "../assets/images/facilities/gym.jpg";

const facilities = [
  {
    title: "Swimming Pool",
    image: pool,
    description:
      "Enjoy our temperature-controlled infinity swimming pool.",
  },

  {
    title: "Restaurant",
    image: restaurant,
    description:
      "Experience delicious international and Indian cuisine.",
  },

  {
    title: "Luxury Spa",
    image: spa,
    description:
      "Relax with world-class spa treatments and wellness therapies.",
  },

  {
    title: "Fitness Center",
    image: gym,
    description:
      "Fully equipped gym with modern fitness equipment.",
  },
];

function Facilities() {
  return (
    <Box sx={{ py: 10, bgcolor: "#fff" }}>
      <Container>

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={1}
        >
          Hotel Facilities
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={5}
        >
          Everything you need for a comfortable and memorable stay.
        </Typography>

        <Grid container spacing={4}>
          {facilities.map((facility) => (
            <Grid item xs={12} md={3} key={facility.title}>
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
                  height="220"
                  image={facility.image}
                  alt={facility.title}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {facility.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {facility.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default Facilities;