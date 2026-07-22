import React, {useEffect, useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";

import { toast } from "react-toastify";

import { getInvoice } from "../../api/paymentApi";

function PaymentInvoice() {
  const navigate = useNavigate();
  const { reservationId } = useParams();

  const location = useLocation();
  const [invoice, setInvoice] = useState(location.state?.invoice || null);
  const [loading, setLoading] = useState(!invoice);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        setLoading(true);
        const response = await getInvoice(reservationId);
        setInvoice(response);
      } catch (error) {
        toast.error(
          error.response?.data?.detail ||
            "Unable to load invoice. Showing dummy invoice instead."
        );

        setInvoice({
          reservation_id: reservationId,
          customer_name: "John Doe",
          room_number: "101",
          amount: 1200.0,
          tax: 216.0,
          discount: 0.0,
          total_amount: 1416.0,
          currency: "INR",
          payment_method: "CARD",
          gateway: "SIMULATION",
          payment_status: "SUCCESS",
          transaction_id: "DUMMY-INV-0001",
          gateway_order_id: null,
          gateway_payment_id: null,
          paid_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    if (!invoice && reservationId) {
      loadInvoice();
    }
  }, [navigate, reservationId, invoice]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!invoice) return null;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F5F7FA", py: 6 }}>
      <Container maxWidth="md">
        <Card elevation={10} sx={{ borderRadius: 6, overflow: "hidden" }}>
          <Box
            sx={{
              background: "linear-gradient(135deg,#0F172A,#1E293B)",
              color: "#fff",
              p: 5,
              textAlign: "center",
            }}
          >
            <ReceiptLongRoundedIcon
              sx={{ fontSize: 46, mb: 1, color: "#D4AF37" }}
            />
            <Typography variant="h4" fontWeight="bold">
              Payment Invoice
            </Typography>
            <Typography sx={{ color: "#CBD5E1", mt: 1 }}>
              Your payment has been completed successfully.
            </Typography>
          </Box>

          <CardContent sx={{ p: 5 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="text.secondary" gutterBottom>
                    Reservation
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    #{invoice.reservation_id}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography color="text.secondary" gutterBottom>
                    Guest
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {invoice.customer_name}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography color="text.secondary" gutterBottom>
                    Room Number
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {invoice.room_number}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <PaymentRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">Payment Status</Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {invoice.payment_status}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <CurrencyRupeeRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">Total Paid</Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight="bold">
                    ₹ {invoice.total_amount}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <HotelRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">Hotel</Typography>
                  </Box>
                  <Typography fontWeight="bold">Royal Hotel</Typography>
                  <Typography color="text.secondary">
                    123 Luxury Avenue, City Center
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <PersonRoundedIcon sx={{ color: "#D4AF37" }} />
                    <Typography color="text.secondary">Issued On</Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {new Date(invoice.payment_date).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ p: 4, borderRadius: 4, bgcolor: "#F8FAFC" }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Payment Breakdown
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">Room Charges</Typography>
                      <Typography fontWeight="bold">₹ {invoice.amount.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">Tax</Typography>
                      <Typography fontWeight="bold">₹ {invoice.tax.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">Discount</Typography>
                      <Typography fontWeight="bold">₹ {invoice.discount.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">Payment Method</Typography>
                      <Typography fontWeight="bold">{invoice.payment_method}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography color="text.secondary">Transaction ID</Typography>
                  <Typography fontWeight="bold">
                    {invoice.transaction_id || "N/A"}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => window.print()}
                    sx={{ borderRadius: 3, px: 4 }}
                  >
                    Print Invoice
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => navigate("/customer/booking-history")}
                    sx={{ borderRadius: 3, px: 4, bgcolor: "#D4AF37", color: "#000", "&:hover": { bgcolor: "#C89B1D" } }}
                  >
                    Back to Bookings
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PaymentInvoice;
