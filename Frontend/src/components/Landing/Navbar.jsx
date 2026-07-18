import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import HotelIcon from "@mui/icons-material/Hotel";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link as RouterLink } from "react-router-dom";

const menus = [
  { title: "Home", id: "home" },
  { title: "Rooms", id: "rooms" },
  { title: "Gallery", id: "gallery" },
  { title: "About", id: "about" },
  { title: "Contact", id: "contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scroll
          ? "rgba(15,23,42,.95)"
          : "rgba(0,0,0,.25)",
        backdropFilter: "blur(12px)",
        transition: ".35s",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 4 },
          minHeight: "90px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* ================= Logo ================= */}

        <Box
          sx={{
            width: 300,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <HotelIcon
            sx={{
              color: "#D4AF37",
              fontSize: 46,
            }}
          />

          <Box>
            <Typography
              sx={{
                color: "#D4AF37",
                fontWeight: 800,
                fontSize: 32,
                lineHeight: 1,
              }}
            >
              Royal Hotel
            </Typography>

            <Typography
              sx={{
                color: "#D4AF37",
                fontSize: 12,
                letterSpacing: 3,
                mt: 0.4,
                opacity: 0.9,
              }}
            >
              ★ LUXURY HOTEL ★
            </Typography>
          </Box>
        </Box>

        {/* ================= Menu ================= */}

        <Box
          sx={{
            flex: 1,
            display: {
              xs: "none",
              md: "flex",
            },
            justifyContent: "center",
            gap: 5,
          }}
        >
          {menus.map((menu) => (
            <Button
              key={menu.id}
              onClick={() => scrollToSection(menu.id)}
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                "&:hover": {
                  color: "#D4AF37",
                },
              }}
            >
              {menu.title}
            </Button>
          ))}
        </Box>

        {/* ================= Buttons ================= */}

        <Box
          sx={{
            width: 260,
            display: {
              xs: "none",
              md: "flex",
            },
            justifyContent: "flex-end",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{
              borderColor: "#D4AF37",
              color: "#D4AF37",
              px: 3,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#D4AF37",
                background: "rgba(212,175,55,.08)",
              },
            }}
          >
            LOGIN
          </Button>

          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            sx={{
              bgcolor: "#D4AF37",
              color: "#000",
              fontWeight: "bold",
              px: 3,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#C69A17",
              },
            }}
          >
            REGISTER
          </Button>
        </Box>

        {/* ================= Mobile ================= */}

        <Button
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            color: "#fff",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </Toolbar>

      {mobileOpen && (
        <Box
          sx={{
            bgcolor: "#111827",
            display: {
              md: "none",
            },
          }}
        >
          {menus.map((menu) => (
            <Button
              key={menu.id}
              fullWidth
              onClick={() => scrollToSection(menu.id)}
              sx={{
                color: "#fff",
                py: 2,
              }}
            >
              {menu.title}
            </Button>
          ))}

          <Button
            component={RouterLink}
            to="/login"
            fullWidth
            sx={{
              color: "#D4AF37",
            }}
          >
            Login
          </Button>

          <Button
            component={RouterLink}
            to="/register"
            fullWidth
            sx={{
              bgcolor: "#D4AF37",
              color: "#000",
            }}
          >
            Register
          </Button>
        </Box>
      )}
    </AppBar>
  );
}