import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

import { toast } from "react-toastify";

import { createPayment, verifyPayment } from "../../api/paymentApi";

function Payments() {

  const navigate = useNavigate();

  const location = useLocation();

  const booking = location.state?.booking;

  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  const [paymentStep, setPaymentStep] = useState(0);

  const [loading, setLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  const amount = Number(booking?.total_price || 0);
  const discount = 0.0;
  const tax = Number((amount * 0.18).toFixed(2));
  const totalAmount = Number((amount + tax - discount).toFixed(2));
  const paymentSteps = [
    "Review",
    "Confirm Payment",
    "Complete",
  ];

  useEffect(() => {
    if (!booking) {
      navigate("/customer/dashboard", { replace: true });
    }
  }, [booking, navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => setRazorpayReady(false);
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (!booking) {
    return null;
  }

  // ==========================================================
  // Make Payment
  // ==========================================================

  const handlePayment = async () => {

    try {
      setLoading(true);
      setPaymentStep(1);

      const order = await createPayment({
        reservation_id: booking.id,
        payment_method: paymentMethod,
      });

      if (order?.test_mode) {
        setPaymentStep(2);
        toast.success("Payment simulated successfully. Your booking is now confirmed.");
        navigate(`/customer/payment-invoice/${booking.id}`);
        return;
      }

      if (!razorpayReady || typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay checkout could not be loaded.");
      }

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Royal Hotel",
        description: `Reservation #${booking.id}`,
        order_id: order.order_id,
        handler: async (response) => {
          try {
            await verifyPayment({
              reservation_id: booking.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setPaymentStep(2);
            toast.success("Payment successful.");
            navigate(`/customer/payment-invoice/${booking.id}`);
          } catch (error) {
            setPaymentStep(0);
            toast.error(
              error.response?.data?.detail ||
                "Payment verification failed."
            );
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setPaymentStep(0);
            toast.info("Payment cancelled.");
          },
        },
        prefill: {
          name: booking?.customer_name || "Guest",
          email: booking?.customer_email || "",
          contact: booking?.customer_phone || "",
        },
        theme: {
          color: "#D4AF37",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      setPaymentStep(0);
      setLoading(false);

      toast.error(
        error.response?.data?.detail ||
          error.message ||
          "Payment Failed."
      );
    }

  };

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

            <Box
              sx={{
                background:
                  "linear-gradient(135deg,#0F172A,#1E293B)",
                color: "#fff",
                p: 4,
                textAlign: "center",
              }}
            >

              <Box
                sx={{
                  width: 70,
                  height: 70,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  bgcolor: "#D4AF37",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CreditCardRoundedIcon
                  sx={{ fontSize: 36, color: "#000" }}
                />
              </Box>

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Secure Payment
              </Typography>

              <Typography
                sx={{ color: "#CBD5E1", mt: 1 }}
              >
                Confirm and pay to finalize your reservation
              </Typography>

            </Box>

            <CardContent sx={{ p: 4 }}>

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Booking Summary
              </Typography>

              <Stepper
                activeStep={paymentStep}
                alternativeLabel
                sx={{ mb: 4 }}
              >
                {paymentSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2.2}>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <HotelRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">
                      Booking ID
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold">
                    {booking.id}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <HotelRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">
                      Room ID
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold">
                    {booking.room_id}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <CalendarMonthRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">
                      Check In
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold">
                    {booking.check_in}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <CalendarMonthRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">
                      Check Out
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold">
                    {booking.check_out}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <PeopleRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">
                      Guests
                    </Typography>
                  </Stack>
                  <Typography fontWeight="bold">
                    {booking.guests}
                  </Typography>
                </Stack>

              </Stack>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <MenuItem value="RAZORPAY">
                    Razorpay (Cards, UPI, Net Banking)
                  </MenuItem>
                </TextField>
              </Box>

              <Stack
                spacing={1.3}
                sx={{ mb: 3 }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary">
                    Amount
                  </Typography>
                  <Typography fontWeight="bold">
                    ₹ {amount.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary">
                    GST (18%)
                  </Typography>
                  <Typography fontWeight="bold">
                    ₹ {tax.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary">
                    Discount
                  </Typography>
                  <Typography fontWeight="bold">
                    ₹ {discount.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: "#FFF8E6",
                  p: 2.5,
                  borderRadius: 3,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <CurrencyRupeeRoundedIcon sx={{ color: "#D4AF37" }} />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Total Payable
                  </Typography>
                </Stack>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#D4AF37"
                >
                  ₹ {totalAmount.toFixed(2)}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 3, color: "text.secondary" }}
              >
                <LockRoundedIcon fontSize="small" />
                <Typography variant="body2">
                  Your payment is processed securely
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mt={4}
              >

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    navigate("/customer/search-rooms")
                  }
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                  }}
                >
                  Back
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  onClick={handlePayment}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    bgcolor: "#D4AF37",
                    color: "#000",

                    "&:hover": {
                      bgcolor: "#C89B1D",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      sx={{ color: "#000" }}
                    />
                  ) : (
                    "Pay Now"
                  )}
                </Button>

              </Stack>

            </CardContent>

          </Card>

        </Fade>

      </Container>

    </Box>

  );

}

export default Payments;
