import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import pool from "../../assets/images/facilities/pool.jpg";
import gym from "../../assets/images/facilities/gym.jpg";
import restaurant from "../../assets/images/facilities/restaurant.jpg";
import spa from "../../assets/images/facilities/spa.jpg";

const images = [restaurant, pool, spa, gym];

export default function RestaurantCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4500);

    return () => clearInterval(id);
  }, []);

  return (
    <Box sx={{ py: 6, background: "#fff" }}>
      <Container maxWidth="lg">
        <Typography
          align="center"
          sx={{ color: "#D4AF37", fontWeight: "bold", letterSpacing: 2 }}
        >
          OUR RESTAURANT
        </Typography>

        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          Dining & Culinary Delights
        </Typography>

        <Box sx={{ position: "relative", height: 420, borderRadius: 4, overflow: "hidden" }}>
          {images.map((src, i) => (
            <Box
              key={i}
              component="img"
              src={src}
              alt={`rest-${i}`}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 1s ease-in-out",
                opacity: i === index ? 1 : 0,
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
