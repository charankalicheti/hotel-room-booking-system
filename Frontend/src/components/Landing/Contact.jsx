import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          sx={{
            color: "#D4AF37",
            fontWeight: "bold",
            letterSpacing: 2,
          }}
        >
          CONTACT US
        </Typography>

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={6}
        >
          We'd Love To Hear From You
        </Typography>

        <Grid container spacing={5}>
          {/* Left Side */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Card elevation={3} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <LocationOn
                    sx={{
                      fontSize: 40,
                      color: "#D4AF37",
                      mb: 1,
                    }}
                  />

                  <Typography variant="h6" fontWeight="bold">
                    Address
                  </Typography>

                  <Typography color="text.secondary">
                    123 Luxury Street,
                    Hyderabad,
                    Telangana,
                    India
                  </Typography>
                </CardContent>
              </Card>

              <Card elevation={3} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Phone
                    sx={{
                      fontSize: 40,
                      color: "#D4AF37",
                      mb: 1,
                    }}
                  />

                  <Typography variant="h6" fontWeight="bold">
                    Phone
                  </Typography>

                  <Typography color="text.secondary">
                    +91 98765 43210
                  </Typography>
                </CardContent>
              </Card>

              <Card elevation={3} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Email
                    sx={{
                      fontSize: 40,
                      color: "#D4AF37",
                      mb: 1,
                    }}
                  />

                  <Typography variant="h6" fontWeight="bold">
                    Email
                  </Typography>

                  <Typography color="text.secondary">
                    support@luxuryhotel.com
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={7}>
            <Card
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
              >
                Send Us a Message
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#D4AF37",
                      px: 5,
                      py: 1.5,
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "#B8860B",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}