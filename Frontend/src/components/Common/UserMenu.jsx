import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useAuth } from "../../context/AuthContext";

function UserMenu() {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();

    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    navigate("/customer/profile", { replace: true });
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1300,
      }}
    >
      <IconButton
        onClick={handleOpen}
        size="large"
        sx={{
          backgroundColor: "white",
          boxShadow: 2,
          border: "1px solid #E5E7EB",
          color: "#111827",
          "&:hover": {
            backgroundColor: "#F3F4F6",
          },
        }}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {user?.name || user?.email || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role || "Member"}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleProfile}>
          <AccountCircleOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Profile
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <LogoutRoundedIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
