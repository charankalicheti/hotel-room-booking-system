import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import hero from "../../assets/images/hero/hero.jpg";

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        py: 10,
        bgcolor: "#F8FAFC",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                color: "#D4AF37",
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              ABOUT US
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
              mt={2}
              mb={3}
            >
              Experience Luxury & Comfort Like Never Before
            </Typography>

            <Typography
              color="text.secondary"
              lineHeight={2}
              mb={3}
            >
              Welcome to our premium hotel, where luxury meets comfort.
              Whether you're traveling for business or leisure, we provide
              world-class hospitality, elegant rooms, exceptional dining,
              and unforgettable experiences.
            </Typography>

            <Typography
              color="text.secondary"
              lineHeight={2}
              mb={4}
            >
              Our dedicated staff is committed to making every guest feel
              at home. From relaxing spa treatments to modern conference
              facilities, we ensure your stay is comfortable, memorable,
              and truly exceptional.
            </Typography>

            {/* Explore More button removed as requested */}
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                overflow: "hidden",
                borderRadius: 5,
              }}
            >
              <Box
                component="img"
                src={hero}
                alt="Hotel"
                sx={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Statistics Cards */}
        <Grid container spacing={3} mt={6}>
          {[
            {
              number: "15+",
              title: "Years Experience",
            },
            {
              number: "250+",
              title: "Luxury Rooms",
            },
            {
              number: "12K+",
              title: "Happy Guests",
            },
            {
              number: "24/7",
              title: "Customer Support",
            },
          ].map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  textAlign: "center",
                  py: 4,
                  borderRadius: 4,
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#D4AF37"
                >
                  {item.number}
                </Typography>

                <Typography color="text.secondary">
                  {item.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}