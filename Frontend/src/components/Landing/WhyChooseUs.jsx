import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function WhyChooseUs() {
  return (
    <Box
      sx={{
        py: 12,
        background: "#0F172A",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=900&q=80"
              alt="Hotel"
              style={{
                width: "100%",
                borderRadius: 20,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
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
              </Grid>

              <Grid item xs={6}>
                <Typography color="#fff">
                  ✔ Luxury Rooms
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="#fff">
                  ✔ Airport Pickup
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="#fff">
                  ✔ Best Price Guarantee
                </Typography>
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

            <Button
              variant="contained"
              sx={{
                mt: 5,
                bgcolor: "#D4AF37",
                color: "#000",
                px: 5,
                py: 1.5,
                fontWeight: "bold",

                "&:hover": {
                  bgcolor: "#c69a17",
                },
              }}
            >
              Discover More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}