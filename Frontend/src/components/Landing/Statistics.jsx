import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const stats = [
  {
    number: "500+",
    title: "Luxury Rooms",
  },
  {
    number: "25K+",
    title: "Happy Guests",
  },
  {
    number: "4.9",
    title: "Customer Rating",
  },
  {
    number: "15+",
    title: "Years Experience",
  },
];

export default function Statistics() {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "#0F172A",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((item) => (
            <Grid item xs={6} md={3} key={item.title}>
              <Typography
                variant="h3"
                align="center"
                fontWeight="bold"
                color="#D4AF37"
              >
                {item.number}
              </Typography>

              <Typography
                align="center"
                color="white"
              >
                {item.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}