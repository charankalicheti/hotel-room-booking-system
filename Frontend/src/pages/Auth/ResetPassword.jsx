import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import {
  LockReset,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { resetPassword } from "../../api/authApi";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {

    register,

    handleSubmit,

    watch,

    formState: {

      errors,

    },

  } = useForm();

  const password = watch("new_password");

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      await resetPassword({

  email,

  otp: data.otp,

  phone: data.phone,

  new_password: data.new_password,

  confirm_password: data.confirm_password,

});;

      toast.success("Password Reset Successfully");

      navigate("/login");

    }

    catch(error){

      toast.error(

        error.response?.data?.detail ||

        "Unable to reset password"

      );

    }

    finally{

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

            {/* Left Side */}

            <Grid
              item
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
                <LockReset fontSize="large" />
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
                Create a new password for your
                account and continue enjoying
                luxury stays.
              </Typography>

            </Grid>

            {/* Right Side */}

            <Grid
              item
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
                  Reset Password
                </Typography>

                <Typography
                  color="text.secondary"
                  mb={4}
                >
                  Enter the OTP sent to your email and create a new password.
                </Typography>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                >

                  <Grid
                    container
                    spacing={3}
                  >

                    <Grid item xs={12}>

                      <TextField
                        fullWidth
                        label="Email Address"
                        value={email}
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                    </Grid>
                    <Grid item xs={12}>

  <TextField
    fullWidth
    label="OTP"
    placeholder="Enter 6 digit OTP"
    {...register("otp", {
      required: "OTP is required",
      pattern: {
        value: /^\d{6}$/,
        message: "Enter valid 6 digit OTP",
      },
    })}
    error={!!errors.otp}
    helperText={errors.otp?.message}
  />

</Grid>

                    <Grid item xs={12}>

                      <TextField
                        fullWidth
                        label="Registered Mobile Number"
                        {...register("phone", {
                          required: "Phone Number is required",
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />

                    </Grid>

                    <Grid item xs={12}>

                      <TextField
                        fullWidth
                        label="New Password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        {...register("new_password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Minimum 8 characters",
                          },
                        })}
                        error={!!errors.new_password}
                        helperText={
                          errors.new_password?.message
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">

                              <IconButton
                                onClick={() =>
                                  setShowPassword(
                                    !showPassword
                                  )
                                }
                              >

                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}

                              </IconButton>

                            </InputAdornment>
                          ),
                        }}
                      />

                    </Grid>

                    <Grid item xs={12}>

                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        {...register(
                          "confirm_password",
                          {
                            required:
                              "Confirm Password is required",

                            validate: (value) =>
                              value === password ||
                              "Passwords do not match",
                          }
                        )}
                        error={
                          !!errors.confirm_password
                        }
                        helperText={
                          errors.confirm_password?.message
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">

                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(
                                    !showConfirmPassword
                                  )
                                }
                              >

                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}

                              </IconButton>

                            </InputAdornment>
                          ),
                        }}
                      />

                    </Grid>

                    <Grid item xs={12}>

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

                          "Reset Password"

                        )}

                      </Button>

                    </Grid>

                    <Grid item xs={12}>

                      <Typography align="center">

                        Back to

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
                          Login
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

export default ResetPassword;