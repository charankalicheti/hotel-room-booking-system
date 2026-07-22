import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import TopNavbar from "../components/Navbar/TopNavbar";

function AdminLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#EEF2FF 0%,#F8FAFC 100%)",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Navigation */}
        <TopNavbar />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            overflowY: "auto",
            background: "linear-gradient(180deg,#F8FAFC,#FFFFFF)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;