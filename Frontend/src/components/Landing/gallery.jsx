import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import gallery1 from "../../assets/images/gallery/gallery1.jpg";
import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery2,
  gallery1,
];

export default function Gallery() {
  return (
    <Box
      id="gallery"
      sx={{
        py: 10,
        background: "#F8FAFC",
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
          HOTEL GALLERY
        </Typography>

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={6}
        >
          Explore Our Luxury Hotel
        </Typography>

        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  overflow: "hidden",
                  borderRadius: 4,
                  transition: ".3s",
                  cursor: "pointer",

                  "& img": {
                    transition: ".4s",
                  },

                  "&:hover img": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={image}
                  alt="Hotel Gallery"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}