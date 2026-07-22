import React from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  KeyboardArrowUp,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#1F2937",
        color: "#fff",
        pt: 8,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {/* Hotel Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#D4AF37"
              gutterBottom
            >
              Luxury Hotel
            </Typography>

            <Typography
              sx={{
                color: "#D1D5DB",
                lineHeight: 2,
              }}
            >
              Experience premium hospitality with luxurious rooms,
              exceptional dining, modern amenities, and unforgettable
              stays designed for comfort and elegance.
            </Typography>

            <Stack direction="row" spacing={1} mt={3}>
                <Link href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" underline="none">
                  <IconButton sx={{ color: "#fff" }}>
                    <Facebook />
                  </IconButton>
                </Link>

                <Link href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer" underline="none">
                  <IconButton sx={{ color: "#fff" }}>
                    <Twitter />
                  </IconButton>
                </Link>

                <Link href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer" underline="none">
                  <IconButton sx={{ color: "#fff" }}>
                    <Instagram />
                  </IconButton>
                </Link>

                <Link href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer" underline="none">
                  <IconButton sx={{ color: "#fff" }}>
                    <LinkedIn />
                  </IconButton>
                </Link>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Quick Links
            </Typography>

            <Stack spacing={1}>
              <Link href="#home" underline="none" color="#D1D5DB">
                Home
              </Link>

              <Link href="#about" underline="none" color="#D1D5DB">
                About
              </Link>

              <Link href="#rooms" underline="none" color="#D1D5DB">
                Rooms
              </Link>

              <Link href="#gallery" underline="none" color="#D1D5DB">
                Gallery
              </Link>

              <Link href="#contact" underline="none" color="#D1D5DB">
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Contact
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <LocationOn sx={{ color: "#D4AF37" }} />
                <Typography color="#D1D5DB">
                  Hyderabad, Telangana, India
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Phone sx={{ color: "#D4AF37" }} />
                <Typography color="#D1D5DB">
                  +91 98765 43210
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Email sx={{ color: "#D4AF37" }} />
                <Typography color="#D1D5DB">
                  support@luxuryhotel.com
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            mt: 6,
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography color="#D1D5DB">
            © {new Date().getFullYear()} Luxury Hotel. All Rights Reserved.
          </Typography>

          <IconButton
            onClick={scrollTop}
            sx={{
              bgcolor: "#D4AF37",
              color: "#fff",
              "&:hover": {
                bgcolor: "#B8860B",
              },
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}