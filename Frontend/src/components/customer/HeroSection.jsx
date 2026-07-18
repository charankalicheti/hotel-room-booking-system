import { Box, Typography, Button, Stack } from "@mui/material";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";
import { useNavigate } from "react-router-dom";

function HeroSection() {

    const navigate = useNavigate();

    return (

        <Box

            sx={{

                height: 500,

                borderRadius: 5,

                overflow: "hidden",

                display: "flex",

                alignItems: "center",

                px: 8,

                color: "#fff",

                backgroundImage:
                    "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.45)),url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')",

                backgroundSize: "cover",

                backgroundPosition: "center",

                mb: 5,

            }}

        >

            <Box>

                <Typography
                    sx={{
                        color: "#D4AF37",
                        fontWeight: "bold",
                        letterSpacing: 3,
                        mb: 2,
                    }}
                >
                    ROYAL HOTEL
                </Typography>

                <Typography
                    variant="h2"
                    fontWeight="bold"
                >
                    Welcome Back 👋
                </Typography>

                <Typography
                    sx={{
                        mt: 2,
                        fontSize: 18,
                        width: "60%",
                    }}
                >
                    Experience luxury beyond expectations.
                    Book premium rooms, manage reservations,
                    and enjoy exclusive offers.
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    mt={4}
                >

                    <Button

                        variant="contained"

                        startIcon={<HotelRoundedIcon />}

                        sx={{
                            bgcolor: "#D4AF37",
                            color: "#000",
                            px: 4,
                            py: 1.5,
                        }}

                        onClick={() => navigate("/rooms")}

                    >

                        Explore Rooms

                    </Button>

                    <Button

                        variant="outlined"

                        startIcon={<BookOnlineRoundedIcon />}

                        sx={{
                            color: "#fff",
                            borderColor: "#fff",
                            px: 4,
                            py: 1.5,
                        }}

                        onClick={() => navigate("/my-bookings")}

                    >

                        My Bookings

                    </Button>

                </Stack>

            </Box>

        </Box>

    );

}

export default HeroSection;