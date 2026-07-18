import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

import { toast } from "react-toastify";

import { getDashboardReport } from "../../api/reportApi";

function Reports() {

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadReport = async () => {

    try {

      setLoading(true);

      const response = await getDashboardReport();

      setReport(response);

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Unable to load report."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadReport();

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

  if (!report) return null;

  const stats = [
    {
      label: "Total Customers",
      value: report.total_customers,
      icon: <GroupRoundedIcon sx={{ fontSize: 40, color: "#D4AF37" }} />,
    },
    {
      label: "Total Rooms",
      value: report.total_rooms,
      icon: <HotelRoundedIcon sx={{ fontSize: 40, color: "#D4AF37" }} />,
    },
    {
      label: "Total Bookings",
      value: report.total_bookings,
      icon: <EventAvailableRoundedIcon sx={{ fontSize: 40, color: "#D4AF37" }} />,
    },
    {
      label: "Total Revenue",
      value: `₹ ${report.total_revenue}`,
      icon: <CurrencyRupeeRoundedIcon sx={{ fontSize: 40, color: "#D4AF37" }} />,
      highlight: true,
    },
    {
      label: "Successful Payments",
      value: report.successful_payments,
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 40, color: "#2E7D32" }} />,
    },
    {
      label: "Cancelled Bookings",
      value: report.cancelled_bookings,
      icon: <CancelRoundedIcon sx={{ fontSize: 40, color: "#D32F2F" }} />,
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

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          mb={1}
        >
          <AssessmentRoundedIcon sx={{ color: "#D4AF37" }} />
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
        </Stack>

        <Typography
          variant="h3"
          fontWeight={800}
          mb={1}
        >
          Reports Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          mb={5}
        >
          A complete overview of hotel performance and revenue.
        </Typography>

        <Grid
          container
          spacing={3}
        >

          {stats.map((stat) => (

            <Grid item xs={12} sm={6} md={4} key={stat.label}>

              <Card
                elevation={stat.highlight ? 10 : 6}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  height: "100%",
                  transition: ".3s",
                  ...(stat.highlight && {
                    background:
                      "linear-gradient(135deg,#0F172A,#1E293B)",
                    color: "#fff",
                  }),

                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                {stat.icon}

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={1.5}
                >
                  {stat.value}
                </Typography>

                <Typography
                  color={
                    stat.highlight
                      ? "#CBD5E1"
                      : "text.secondary"
                  }
                >
                  {stat.label}
                </Typography>

              </Card>

            </Grid>

          ))}

        </Grid>

        {/* ================= Summary Banner ================= */}

        <Card
          elevation={4}
          sx={{
            mt: 6,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <CardContent sx={{ p: 5, textAlign: "center" }}>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Performance Snapshot
            </Typography>

            <Typography
              sx={{
                maxWidth: 750,
                mx: "auto",
                color: "#CBD5E1",
              }}
            >
              Royal Hotel currently manages {report.total_rooms} rooms
              across {report.total_customers} registered customers, with
              {" "}{report.total_bookings} total bookings generating
              ₹{report.total_revenue} in revenue.
            </Typography>

          </CardContent>

        </Card>

      </Container>

    </Box>

  );

}

export default Reports;
