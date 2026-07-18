import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

const testimonials = [
  {
    name: "John Anderson",
    role: "Business Traveler",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Outstanding experience! The rooms were luxurious, the staff was welcoming, and everything exceeded my expectations.",
  },
  {
    name: "Sophia Williams",
    role: "Family Vacation",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "Perfect destination for a family trip. Clean rooms, delicious food, and amazing facilities for everyone.",
  },
  {
    name: "Michael Brown",
    role: "Holiday Stay",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 4.5,
    review:
      "Excellent hospitality and beautiful surroundings. I would definitely recommend this hotel to my friends.",
  },
];

export default function Testimonials() {
  return (
    <Box
      id="testimonials"
      sx={{
        py: 10,
        background: "#fff",
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
          TESTIMONIALS
        </Typography>

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={6}
        >
          What Our Guests Say
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 4,
                  height: "100%",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    src={item.image}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                    }}
                  />

                  <Typography
                    align="center"
                    variant="h6"
                    fontWeight="bold"
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    align="center"
                    color="text.secondary"
                    mb={2}
                  >
                    {item.role}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="center"
                    mb={2}
                  >
                    <Rating
                      value={item.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>

                  <Typography
                    color="text.secondary"
                    align="center"
                  >
                    "{item.review}"
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