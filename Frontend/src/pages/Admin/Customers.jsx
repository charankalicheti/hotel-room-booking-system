import React, {useEffect, useMemo, useState} from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

import { toast } from "react-toastify";

import {
  getCustomers,
  deleteCustomer,
} from "../../api/customerApi";

function Customer() {

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ==========================================================
  // Load Customers
  // ==========================================================

  const loadCustomers = async () => {

    try {

      setLoading(true);

      const response = await getCustomers();

      setCustomers(response);

    } catch (error) {

      toast.error(

        error.response?.data?.detail ||

        "Unable to load customers."

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadCustomers();

  }, []);

  const filteredCustomers = useMemo(() => {

    return customers.filter((customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [customers, search]);

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
          Customer Management
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          View, monitor, and manage all registered customers.
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <GroupRoundedIcon
                sx={{ color: "#D4AF37", fontSize: 40 }}
              />
              <Typography variant="h4" fontWeight="bold">
                {customers.length}
              </Typography>
              <Typography color="text.secondary">
                Total Customers
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <VerifiedRoundedIcon
                sx={{ color: "#D4AF37", fontSize: 40 }}
              />
              <Typography variant="h4" fontWeight="bold">
                {
                  customers.filter((c) => c.is_verified)
                    .length
                }
              </Typography>
              <Typography color="text.secondary">
                Verified Accounts
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <PersonRoundedIcon
                sx={{ color: "#D4AF37", fontSize: 40 }}
              />
              <Typography variant="h4" fontWeight="bold">
                {
                  customers.filter((c) => !c.is_verified)
                    .length
                }
              </Typography>
              <Typography color="text.secondary">
                Pending Verification
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#D4AF37" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
            bgcolor: "#fff",
            borderRadius: 2,
          }}
        />

        <Grid
          container
          spacing={3}
        >
          {filteredCustomers.length === 0 ? (

            <Grid item xs={12}>

              <Card
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >
                <GroupRoundedIcon
                  sx={{ fontSize: 70, color: "#D4AF37", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  No customers found.
                </Typography>
              </Card>

            </Grid>

          ) : (

            filteredCustomers.map((customer) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={customer.id}
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
                      spacing={2}
                      alignItems="center"
                      mb={2}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#D4AF37",
                          color: "#000",
                          width: 50,
                          height: 50,
                          fontWeight: "bold",
                        }}
                      >
                        {customer.name?.[0]?.toUpperCase()}
                      </Avatar>

                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          lineHeight={1.2}
                        >
                          {customer.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {customer.email}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack spacing={1} mt={2}>

                      <Typography variant="body2">
                        <b>Phone :</b> {customer.phone}
                      </Typography>

                      <Typography variant="body2">
                        <b>Role :</b> {customer.role}
                      </Typography>

                    </Stack>

                    <Box mt={2}>

                      <Chip
                        size="small"
                        label={
                          customer.is_verified
                            ? "Verified"
                            : "Not Verified"
                        }
                        color={
                          customer.is_verified
                            ? "success"
                            : "warning"
                        }
                        sx={{ fontWeight: 700 }}
                      />

                    </Box>

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mt={2}
                    >

                      <IconButton
                        color="error"
                        onClick={async () => {

                          if (
                            !window.confirm(
                              `Delete ${customer.name}?`
                            )
                          ) {
                            return;
                          }

                          try {

                            await deleteCustomer(
                              customer.id
                            );

                            toast.success(
                              "Customer deleted successfully."
                            );

                            loadCustomers();

                          } catch (error) {

                            toast.error(

                              error.response?.data?.detail ||

                              "Unable to delete customer."

                            );

                          }

                        }}
                      >

                        <DeleteRoundedIcon />

                      </IconButton>

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

export default Customer;
