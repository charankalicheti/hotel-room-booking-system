import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { forgotPassword } from "../../api/authApi";

function ForgotPassword() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      await forgotPassword(data.email);

      toast.success(
  "OTP sent to your registered email."
);

      navigate("/reset-password", {
  state: {
    email: data.email,
  },
  replace: true,
});

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to process request."
      );

    } finally {

      setLoading(false);

    }

  };
    return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A)",
        display: "flex",
        alignItems: "center",
        py: 5,
      }}
    >

      <Container maxWidth="md">

        <Card
          elevation={12}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >

          <Grid container>

            {/* Left Section */}

            <Grid
              xs={12}
              md={5}
              sx={{
                background:
                  "linear-gradient(135deg,#D4AF37,#B8860B)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                p: 5,
              }}
            >

              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: "#fff",
                  color: "#D4AF37",
                  mb: 3,
                }}
              >
                <LockResetIcon fontSize="large" />
              </Avatar>

              <Typography
                variant="h4"
                fontWeight="bold"
                align="center"
              >
                Royal Hotel
              </Typography>

              <Typography
                align="center"
                mt={3}
              >
                Forgot your password?

                Don't worry.

                We'll help you recover your account securely.
              </Typography>

            </Grid>

            {/* Right Section */}

            <Grid
              xs={12}
              md={7}
            >

              <CardContent
                sx={{
                  p: 5,
                }}
              >

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mb={1}
                >
                  Forgot Password
                </Typography>

                <Typography
                  color="text.secondary"
                  mb={4}
                >
                  Enter your registered email to receive an OTP.
                </Typography>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                >

                  <Grid
                    container
                    spacing={3}
                  >

                    <Grid xs={12}>

                      <TextField
                        fullWidth
                        label="Email Address"
                        placeholder="Enter your registered email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message:
                              "Enter a valid email address",
                          },
                        })}
                        error={!!errors.email}
                        helperText={
                          errors.email?.message
                        }
                      />

                    </Grid>

                    <Grid xs={12}>

                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                          py: 1.8,
                          borderRadius: 3,
                          fontWeight: "bold",
                          fontSize: 18,
                          background:
                            "linear-gradient(90deg,#D4AF37,#C49A2C)",
                          color: "#000",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg,#C49A2C,#B8860B)",
                          },
                        }}
                      >

                        {loading ? (

                          <CircularProgress
                            size={24}
                            sx={{
                              color: "#000",
                            }}
                          />

                        ) : (

                          "Send OTP"

                        )}

                      </Button>

                    </Grid>

                    <Grid xs={12}>

                      <Typography
                        align="center"
                      >

                        Remember your password?

                        <Link
                          component="button"
                          underline="hover"
                          sx={{
                            ml: 1,
                            color: "#D4AF37",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate("/login")
                          }
                        >
                          Back to Login
                        </Link>

                      </Typography>

                    </Grid>
                                      </Grid>

                </form>

              </CardContent>

            </Grid>

          </Grid>

        </Card>

      </Container>

    </Box>

  );

}

export default ForgotPassword;