import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import { toast } from "react-toastify";

import {
  getPaymentDashboard,
  getPaymentHistory,
  refundPayment,
} from "../../api/paymentApi";

function Payments() {

  const [dashboard, setDashboard] = useState(null);

  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {

    try {

      setLoading(true);

      const dashboardData =
        await getPaymentDashboard();

      const paymentData =
        await getPaymentHistory();

      setDashboard(dashboardData);

      setPayments(paymentData);

    } catch (error) {

      toast.error(

        error.response?.data?.detail ||

        "Unable to load payments."

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadPayments();

  }, []);

  const statusColor = (status) =>
    status === "SUCCESS" || status === "REFUNDED"
      ? "success"
      : status === "PENDING"
      ? "warning"
      : "error";

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

  const cards = [
    {
      label: "Total Revenue",
      value: `₹ ${dashboard?.total_revenue ?? 0}`,
      icon: <CurrencyRupeeRoundedIcon sx={{ fontSize: 38, color: "#D4AF37" }} />,
      color: "#0F172A",
    },
    {
      label: "Successful",
      value: dashboard?.successful_payments ?? 0,
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 38, color: "#2E7D32" }} />,
      color: "success.main",
    },
    {
      label: "Pending",
      value: dashboard?.pending_payments ?? 0,
      icon: <PendingRoundedIcon sx={{ fontSize: 38, color: "#ED6C02" }} />,
      color: "warning.main",
    },
    {
      label: "Failed",
      value: dashboard?.failed_payments ?? 0,
      icon: <CancelRoundedIcon sx={{ fontSize: 38, color: "#D32F2F" }} />,
      color: "error.main",
    },
  ];

  return (

    <Box
      sx={{
        bgcolor: "#F5F7FA",
        minHeight: "100vh",
        py: 6,
      }}
    >

      <Container maxWidth="xl">

        <Typography
          sx={{
            color: "#D4AF37",
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Royal Hotel · Admin
        </Typography>

        <Typography
          variant="h3"
          fontWeight={800}
          mt={1}
          mb={1}
        >
          Payment Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          mb={5}
        >
          Monitor revenue, transaction status, and manage refunds.
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ mb: 6 }}
        >

          {cards.map((card) => (

            <Grid item xs={12} sm={6} md={3} key={card.label}>

              <Card
                elevation={6}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  {card.icon}

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    mt={1.5}
                    color={card.color}
                  >
                    {card.value}
                  </Typography>

                  <Typography color="text.secondary">
                    {card.label}
                  </Typography>
                </Box>
              </Card>

            </Grid>

          ))}

        </Grid>

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          mt={8}
          mb={3}
        >
          <ReceiptLongRoundedIcon sx={{ color: "#D4AF37" }} />
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Payment History
          </Typography>
        </Stack>

        <Grid
          container
          spacing={3}
        >
          {payments.length === 0 ? (

            <Grid item xs={12}>

              <Card
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >
                <ReceiptLongRoundedIcon
                  sx={{ fontSize: 70, color: "#D4AF37", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  No payment history found.
                </Typography>
              </Card>

            </Grid>

          ) : (

            payments.map((payment) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={payment.id}
              >

                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    transition: ".3s",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 10,
                    },
                  }}
                >

                  <CardContent>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1.5}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        #{payment.id}
                      </Typography>

                      <Chip
                        size="small"
                        label={payment.payment_status}
                        color={statusColor(payment.payment_status)}
                        sx={{ fontWeight: 700 }}
                      />
                    </Stack>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                      gutterBottom
                    >
                      Reservation ID : {payment.reservation_id}
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#D4AF37"
                      mt={1}
                    >
                      ₹ {payment.total_amount}
                    </Typography>

                    <Stack spacing={0.5} mt={2}>

                      <Typography variant="body2">
                        <b>Method :</b> {payment.payment_method}
                      </Typography>

                      <Typography variant="body2">
                        <b>Date :</b>{" "}
                        {payment.created_at
                          ? new Date(
                              payment.created_at
                            ).toLocaleDateString()
                          : "-"}
                      </Typography>

                    </Stack>

                    <Box
                      mt={3}
                      display="flex"
                      justifyContent="flex-end"
                    >

                      {payment.payment_status !==
                      "REFUNDED" ? (

                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          sx={{ borderRadius: 2, fontWeight: 700 }}
                          onClick={async () => {

                            if (
                              !window.confirm(
                                "Refund this payment?"
                              )
                            ) {
                              return;
                            }

                            try {

                              await refundPayment(
                                payment.id
                              );

                              toast.success(
                                "Payment refunded successfully."
                              );

                              loadPayments();

                            } catch (error) {

                              toast.error(

                                error.response?.data?.detail ||

                                "Unable to refund payment."

                              );

                            }

                          }}
                        >

                          Refund

                        </Button>

                      ) : (

                        <Chip
                          label="Refunded"
                          color="success"
                          size="small"
                          sx={{ fontWeight: 700 }}
                        />

                      )}

                    </Box>

                  </CardContent>

                </Card>

              </Grid>

            ))

          )}

        </Grid>

      </Container>

    </Box>

  );

}

export default Payments;
