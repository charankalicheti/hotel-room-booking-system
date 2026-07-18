import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SpaIcon from "@mui/icons-material/Spa";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

const amenities = [
  {
    title: "Free WiFi",
    icon: <WifiIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Swimming Pool",
    icon: <PoolIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Restaurant",
    icon: <RestaurantIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Luxury Spa",
    icon: <SpaIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Fitness Center",
    icon: <FitnessCenterIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Free Parking",
    icon: <LocalParkingIcon sx={{ fontSize: 55 }} />,
  },
];

export default function Amenities() {
  return (
    <Box
      sx={{
        py: 10,
        background: "#ffffff",
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
          LUXURY FACILITIES
        </Typography>

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={7}
        >
          Hotel Amenities
        </Typography>

        <Grid container spacing={4}>
          {amenities.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Card
                sx={{
                  textAlign: "center",
                  py: 4,
                  borderRadius: 5,
                  transition: ".3s",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      color: "#D4AF37",
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {item.title}
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