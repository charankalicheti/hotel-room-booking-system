import React, {useState, useEffect} from "react";
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
  TextField,
  Typography,
} from "@mui/material";

import SmsIcon from "@mui/icons-material/Sms";

import { toast } from "react-toastify";

import {
  sendOTP,
  verifyOTP,
} from "../../api/authApi";

import { useAuth } from "../../context/AuthContext";

export default function VerifyOTP() {

  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const customer = location.state ?? {};

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);

  useEffect(() => {

    if (!customer.email) {

      navigate("/register");

    }

  }, [customer, navigate]);

  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {

      setTimer((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleChange = (index, value) => {

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {

      document
        .getElementById(`otp-${index + 1}`)
        ?.focus();

    }

  };

  const handleKeyDown = (index, e) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      document
        .getElementById(`otp-${index - 1}`)
        ?.focus();

    }

  };

  const handlePaste = (e) => {

    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const digits = pasted.split("");

    while (digits.length < 6) {

      digits.push("");

    }

    setOtp(digits);

  };

  const handleVerifyOTP = async () => {

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {

      toast.error("Enter valid OTP");

      return;

    }

    try {

      setLoading(true);

      const response = await verifyOTP(
        customer.email,
        otpValue
      );

      login(
        response.access_token,
        response
      );

      toast.success(
        "Account Verified Successfully"
      );

      if (response.role === "admin") {

        navigate("/admin/dashboard");

      } else {

        navigate("/customer/dashboard");

      }

    } catch (error) {

      toast.error(

        error.response?.data?.detail ||

        "Invalid OTP"

      );

    } finally {

      setLoading(false);

    }

  };

  const resendOTP = async () => {

    try {

      await sendOTP(customer.email);

      setTimer(30);

      toast.success(
        "OTP Sent Successfully"
      );

    } catch (error) {

      toast.error(

        error.response?.data?.detail ||

        "Unable to send OTP"

      );

    }

  };

  return (    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A)",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 5,
            boxShadow: "0 15px 40px rgba(0,0,0,.25)",
          }}
        >
          <CardContent
            sx={{
              p: 5,
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#D4AF37",
                mx: "auto",
                mb: 3,
              }}
            >
              <SmsIcon fontSize="large" />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              OTP Verification
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Enter the 6 digit OTP sent to
              <br />
              <b>{customer.email}</b>
            </Typography>

            <Grid
              container
              spacing={2}
              justifyContent="center"
            >
              {otp.map((digit, index) => (
                <Grid key={index}>
                  <TextField
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) =>
                      handleChange(
                        index,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    onPaste={handlePaste}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "26px",
                        fontWeight: "bold",
                        width: "22px",
                      },
                    }}
                    sx={{
                      width: 60,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography
              mt={4}
              color="text.secondary"
            >
              Didn't receive the OTP?
            </Typography>

            <Typography
              mt={1}
              fontWeight={600}
            >
              {timer > 0
                ? `Resend in ${timer}s`
                : "You can resend now"}
            </Typography>

            <Button
              sx={{ mt: 1 }}
              disabled={timer > 0}
              onClick={resendOTP}
            >
              Resend OTP
            </Button>

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleVerifyOTP}
              sx={{
                mt: 4,
                py: 2,
                fontWeight: 700,
                fontSize: 16,
                background: "#D4AF37",
                color: "#000",
                borderRadius: 3,

                "&:hover": {
                  background: "#C79A1B",
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
                "Verify OTP"
              )}
            </Button>

            <Button
              fullWidth
              variant="text"
              sx={{
                mt: 2,
                textTransform: "none",
              }}
              onClick={() =>
                navigate("/register")
              }
            >
              Back to Register
            </Button>

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}