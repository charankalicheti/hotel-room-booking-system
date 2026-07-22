import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { toast } from "react-toastify";

import { getProfile } from "../../api/profileApi";

function Profile() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {

    try {

      setLoading(true);

      const response = await getProfile();

      setProfile(response);

    } catch (error) {

      toast.error(

        error.response?.data?.detail ||

        "Unable to load profile."

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProfile();

  }, []);

  if (loading) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >

        <CircularProgress
          size={60}
          sx={{ color: "#D4AF37" }}
        />

      </Box>

    );

  }

  if (!profile) return null;

  const infoRows = [
    {
      icon: <EmailRoundedIcon sx={{ color: "#D4AF37" }} />,
      label: "Email",
      value: profile.email,
    },
    {
      icon: <PhoneRoundedIcon sx={{ color: "#D4AF37" }} />,
      label: "Phone",
      value: profile.phone,
    },
    {
      icon: <BadgeRoundedIcon sx={{ color: "#D4AF37" }} />,
      label: "Role",
      value: profile.role,
    },
  ];

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F9FC",
        py: 6,
      }}
    >

      <Container maxWidth="sm">

        <Fade in timeout={700}>

          <Card
            elevation={10}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
            }}
          >

            {/* ================= Header ================= */}

            <Box
              sx={{
                background:
                  "linear-gradient(135deg,#0F172A,#1E293B)",
                color: "#fff",
                py: 6,
                textAlign: "center",
                position: "relative",
              }}
            >

              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  mx: "auto",
                  bgcolor: "#D4AF37",
                  border: "4px solid #fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,.3)",
                }}
              >
                <PersonRoundedIcon
                  sx={{ fontSize: 60, color: "#000" }}
                />
              </Avatar>

              <Typography
                variant="h4"
                fontWeight="bold"
                mt={2}
              >
                {profile.name}
              </Typography>

              <Chip
                icon={
                  profile.is_verified ? (
                    <VerifiedRoundedIcon />
                  ) : (
                    <CancelRoundedIcon />
                  )
                }
                label={
                  profile.is_verified
                    ? "Verified Account"
                    : "Not Verified"
                }
                color={
                  profile.is_verified ? "success" : "error"
                }
                sx={{
                  mt: 1.5,
                  fontWeight: 700,
                }}
              />

            </Box>

            {/* ================= Details ================= */}

            <CardContent sx={{ p: 4 }}>

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Account Details
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>

                {infoRows.map((row) => (

                  <Paper
                    key={row.label}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: "#F8F9FC",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {row.icon}

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {row.label}
                      </Typography>

                      <Typography fontWeight="bold">
                        {row.value}
                      </Typography>
                    </Box>

                  </Paper>

                ))}

              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() =>
                  navigate("/customer/dashboard")
                }
                sx={{
                  mt: 4,
                  py: 1.6,
                  borderRadius: 3,
                  fontWeight: 700,
                  bgcolor: "#D4AF37",
                  color: "#000",

                  "&:hover": {
                    bgcolor: "#C89B1D",
                  },
                }}
              >
                Back to Dashboard
              </Button>

            </CardContent>

          </Card>

        </Fade>

      </Container>

    </Box>

  );

}

export default Profile;
