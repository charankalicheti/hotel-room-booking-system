import React, {useEffect, useMemo, useState} from "react";
import gallery1 from "../../assets/images/gallery/gallery1.jpg";
import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";
import {
  Box,
  Button,
  Container,
  Typography,
  Fade,
  Stack,
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const images = useMemo(() => [gallery1, gallery2, gallery3, gallery4].filter(Boolean), []);

  const [searchData, setSearchData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (images.length <= 1) {
      return undefined;
    }

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);

    return () => clearInterval(id);
  }, [images.length]);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    navigate("/login");
  };

  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      // background handled by absolutely positioned images for smooth fade
      }}
    >
      {/* Background images (crossfade) */}
      {images.length > 0 && images.map((src, i) => (
        <Box
          key={i}
          component="img"
          src={src}
          alt={`hero-${i}`}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.6s ease-in-out, transform 6s ease",
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.02)" : "scale(1)",
            zIndex: 0,
          }}
        />
      ))}
      {/* Left Gradient */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(90deg,rgba(8,8,8,.72) 0%,rgba(8,8,8,.50) 35%,rgba(8,8,8,.18) 65%,transparent 100%)",
        }}
      />

      {/* Gold Circle */}

      <Box
        sx={{
          position: "absolute",
          right: -180,
          top: -180,

          width: 520,
          height: 520,

          borderRadius: "50%",

          background:
            "radial-gradient(circle,#D4AF3730,transparent)",

          filter: "blur(25px)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 10,
        }}
      >
        <Fade
          in={loaded}
          timeout={1200}
        >
          <Box
            sx={{
              maxWidth: 760,
              mt: 8,
            }}
          >
            <Typography
              sx={{
                color: "#D4AF37",
                letterSpacing: 7,
                textTransform: "uppercase",
                fontWeight: 700,
                mb: 3,

                fontSize: {
                  xs: 14,
                  md: 18,
                },
              }}
            >
              Welcome To Royal Hotel
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                lineHeight: 1.05,
                mb: 4,

                fontSize: {
                  xs: "3rem",
                  sm: "4rem",
                  md: "5.5rem",
                },
              }}
            >
              Experience

              <Box
                component="span"
                sx={{
                  color: "#D4AF37",
                }}
              >
                {" "}
                Luxury
              </Box>

              <br />

              Like Never Before
            </Typography>

            <Typography
              sx={{
                color: "#F2F2F2",
                maxWidth: 620,
                lineHeight: 2,
                mb: 5,

                fontSize: {
                  xs: 17,
                  md: 21,
                },
              }}
            >
              Discover premium suites,
              world-class hospitality,
              infinity pool, spa,
              rooftop dining,
              conference halls and unforgettable
              luxury experiences crafted for every guest.
            </Typography>

            <Stack
              direction="row"
              spacing={3}
            >
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#D4AF37",
                  color: "#000",
                  px: 5,
                  py: 1.8,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 17,

                  "&:hover": {
                    bgcolor: "#c69a17",
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 20px 35px rgba(212,175,55,.45)",
                  },
                }}
              >
                Book Your Stay
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  if (window.location.pathname === "/" || window.location.pathname.startsWith("/landing")) {
                    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/#rooms");
                  }
                }}
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  px: 5,
                  py: 1.8,
                  borderRadius: 50,
                  fontWeight: 700,

                  "&:hover": {
                    borderColor: "#D4AF37",
                    color: "#D4AF37",
                    background:
                      "rgba(255,255,255,.08)",
                  },
                }}
              >
                Explore Rooms
              </Button>
            </Stack>
                        {/* Floating Booking Card */}

            <Box
              sx={{
                mt: 10,
                width: "100%",
                maxWidth: 1200,
              }}
            >
              <Box
                sx={{
                  background: "rgba(255,255,255,.12)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,.18)",
                  borderRadius: "24px",
                  p: 3,

                  display: "grid",

                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.4fr 1.2fr 1fr auto",
                  },

                  gap: 2,

                  boxShadow:
                    "0 25px 60px rgba(0,0,0,.35)",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 35px 80px rgba(0,0,0,.45)",
                  },
                }}
              >
                {/* Destination removed per request */}

                {/* Check In */}

                <Box>
                  <Typography
                    sx={{
                      color: "#D4AF37",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Check In
                  </Typography>

                  <input
                    type="date"
                    name="checkIn"
                    value={searchData.checkIn}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,.25)",
                      background: "rgba(255,255,255,.08)",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </Box>

                {/* Check Out */}

                <Box>
                  <Typography
                    sx={{
                      color: "#D4AF37",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Check Out
                  </Typography>

                  <input
                    type="date"
                    name="checkOut"
                    value={searchData.checkOut}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,.25)",
                      background: "rgba(255,255,255,.08)",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </Box>

                {/* Guests */}

                <Box>
                  <Typography
                    sx={{
                      color: "#D4AF37",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Guests
                  </Typography>

                  <select
                    name="guests"
                    value={searchData.guests}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,.25)",
                      background: "rgba(255,255,255,.08)",
                      color: "#fff",
                      outline: "none",
                    }}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                  </select>
                </Box>

                {/* Search Button */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={handleSearch}
                    sx={{
                      bgcolor: "#D4AF37",
                      color: "#000",
                      height: 56,
                      fontWeight: 800,
                      borderRadius: "14px",
                      fontSize: 16,

                      "&:hover": {
                        bgcolor: "#c89b1d",
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    SEARCH
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Scroll Down */}

            <Box
              sx={{
                mt: 8,
                display: "flex",
                justifyContent: "center",

                animation: "bounce 2s infinite",

                "@keyframes bounce": {
                  "0%,100%": {
                    transform: "translateY(0)",
                  },
                  "50%": {
                    transform: "translateY(12px)",
                  },
                },
              }}
            >
              <KeyboardArrowDownRoundedIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: 42,
                }}
              />
            </Box>
          </Box>
        </Fade>
      </Container>
            {/* Bottom Fade */}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 180,
          background:
            "linear-gradient(to top,#ffffff 0%,rgba(255,255,255,.65) 45%,transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Statistics */}

      <Fade
        in={loaded}
        timeout={1800}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 35,
            right: {
              xs: 20,
              lg: 80,
            },

            display: {
              xs: "none",
              lg: "flex",
            },

            gap: 2,
          }}
        >
          {[
            {
              number: "500+",
              text: "Luxury Rooms",
            },
            {
              number: "25K+",
              text: "Happy Guests",
            },
            {
              number: "4.9★",
              text: "Customer Rating",
            },
            {
              number: "15+",
              text: "Awards",
            },
          ].map((item) => (
            <Box
              key={item.text}
              sx={{
                minWidth: 150,
                p: 3,
                borderRadius: 4,
                textAlign: "center",

                background:
                  "rgba(255,255,255,.15)",

                backdropFilter: "blur(18px)",

                border:
                  "1px solid rgba(255,255,255,.25)",

                transition: ".35s",

                "&:hover": {
                  transform: "translateY(-10px)",
                  background:
                    "rgba(255,255,255,.22)",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#D4AF37",
                  fontWeight: 800,
                  fontSize: 32,
                }}
              >
                {item.number}
              </Typography>

              <Typography
                sx={{
                  color: "#fff",
                  mt: 1,
                  fontSize: 15,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Fade>

      {/* Decorative Gold Glow */}

      <Box
        sx={{
          position: "absolute",
          left: -250,
          bottom: -250,

          width: 500,
          height: 500,

          borderRadius: "50%",

          background:
            "radial-gradient(circle,#D4AF3735,transparent)",

          filter: "blur(80px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: -250,
          top: -250,

          width: 550,
          height: 550,

          borderRadius: "50%",

          background:
            "radial-gradient(circle,#ffffff18,transparent)",

          filter: "blur(100px)",
        }}
      />
    </Box>
  );
}