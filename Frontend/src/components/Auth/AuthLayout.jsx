import React from "react";
import { Box, Container } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage:
          "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80')",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* Left Overlay */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(90deg,rgba(15,23,42,.88) 0%,rgba(15,23,42,.65) 45%,rgba(15,23,42,.20) 100%)",
        }}
      />

      {/* Gold Glow */}

      <Box
        sx={{
          position: "absolute",

          right: -150,
          top: -150,

          width: 450,
          height: 450,

          borderRadius: "50%",

          background:
            "radial-gradient(circle,#D4AF3740,transparent)",

          filter: "blur(80px)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}