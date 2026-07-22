import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function WhyChooseUs() {
  return (
    <Box
      sx={{
        py: 8,
        background: "#0F172A",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
        >
          <Grid item xs={12} md={12}>
            <Typography
              sx={{
                color: "#D4AF37",
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              WHY CHOOSE US
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Enjoy a Luxury Experience
            </Typography>

            <Typography
              sx={{
                color: "#ddd",
                mt: 3,
                mb: 4,
                lineHeight: 2,
              }}
            >
              Royal Hotel offers elegant rooms, premium dining,
              spa facilities, a swimming pool, conference halls,
              fitness center, airport pickup, and exceptional
              customer service for an unforgettable stay.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="#fff">
                  ✔ 24/7 Reception
                </Typography>
              {/* buttons removed */}
              </Grid>

              <Grid item xs={6}>
                <Typography color="#fff">
                  ✔ Free Breakfast
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="#fff">
                  ✔ Premium Service
                </Typography>
              </Grid>
            </Grid>

            {/* Discover More button removed as requested */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}