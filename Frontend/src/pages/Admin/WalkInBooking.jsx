import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import api from "../../api/axios";

function WalkInBooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    check_in: "",
    check_out: "",
    guests: "",
    room_type: "",
  });
  const [form, setForm] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
    id_proof_type: "Aadhaar",
    id_proof_number: "",
    address: "",
    guests: 1,
    room_id: "",
    check_in: "",
    check_out: "",
    special_requests: "",
    payment_method: "CASH",
    discount: 0,
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.check_in) params.append("check_in", filters.check_in);
      if (filters.check_out) params.append("check_out", filters.check_out);
      if (filters.guests) params.append("guests", filters.guests);
      const { data } = await api.get(`/admin/walk-in/rooms?${params.toString()}`);
      setRooms(data || []);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Unable to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/admin/walk-in");
      setBookings(data || []);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Unable to load bookings.");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesType = !filters.room_type || room.room_type?.toLowerCase().includes(filters.room_type.toLowerCase());
      const matchesSearch = !search || `${room.room_number} ${room.room_type}`.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [rooms, filters, search]);

  const nights = useMemo(() => {
    if (!form.check_in || !form.check_out) return 0;
    const start = new Date(form.check_in);
    const end = new Date(form.check_out);
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) || 1);
    return diff;
  }, [form.check_in, form.check_out]);

  const roomPrice = useMemo(() => {
    const room = rooms.find((item) => item.id === Number(form.room_id));
    return room ? room.price * nights : 0;
  }, [rooms, form.room_id, nights]);

  const tax = useMemo(() => roomPrice * 0.18, [roomPrice]);
  const discount = Number(form.discount || 0);
  const total = roomPrice + tax - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    await fetchRooms();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.mobile_number || !form.id_proof_number || !form.address || !form.check_in || !form.check_out || !form.room_id) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        ...form,
        guests: Number(form.guests),
        room_id: Number(form.room_id),
        discount: Number(form.discount || 0),
      };
      const { data } = await api.post("/admin/walk-in", payload);
      setSubmittedBooking(data);
      setConfirmationOpen(true);
      toast.success("Walk-in booking created successfully.");
      await fetchBookings();
      setForm({
        full_name: "",
        mobile_number: "",
        email: "",
        id_proof_type: "Aadhaar",
        id_proof_number: "",
        address: "",
        guests: 1,
        room_id: "",
        check_in: "",
        check_out: "",
        special_requests: "",
        payment_method: "CASH",
        discount: 0,
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || "Unable to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Walk-in Booking</Typography>
          <Typography color="text.secondary">Create bookings for guests arriving directly at the hotel.</Typography>
        </Box>
        <Button variant="outlined" onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Guest Registration</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><TextField fullWidth label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Mobile Number" name="mobile_number" value={form.mobile_number} onChange={handleChange} required /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Email (Optional)" name="email" value={form.email} onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="ID Proof Number" name="id_proof_number" value={form.id_proof_number} onChange={handleChange} required /></Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>ID Proof Type</InputLabel>
                    <Select label="ID Proof Type" name="id_proof_type" value={form.id_proof_type} onChange={handleChange}>
                      <MenuItem value="Aadhaar">Aadhaar</MenuItem>
                      <MenuItem value="PAN">PAN</MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                      <MenuItem value="Driving License">Driving License</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Number of Guests" name="guests" type="number" value={form.guests} onChange={handleChange} required /></Grid>
                <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Address" name="address" value={form.address} onChange={handleChange} required /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Check-in Date" name="check_in" type="date" InputLabelProps={{ shrink: true }} value={form.check_in} onChange={handleChange} required /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Check-out Date" name="check_out" type="date" InputLabelProps={{ shrink: true }} value={form.check_out} onChange={handleChange} required /></Grid>
                <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Special Requests" name="special_requests" value={form.special_requests} onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select label="Payment Method" name="payment_method" value={form.payment_method} onChange={handleChange}>
                      <MenuItem value="CASH">Cash</MenuItem>
                      <MenuItem value="UPI">UPI</MenuItem>
                      <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
                      <MenuItem value="DEBIT_CARD">Debit Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Discount" name="discount" type="number" value={form.discount} onChange={handleChange} /></Grid>
              </Grid>

              <Typography variant="h6" fontWeight={700} mt={3} mb={1}>Select Room</Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
                <TextField label="Search Room" value={search} onChange={(e) => setSearch(e.target.value)} />
                <TextField label="Room Type" value={filters.room_type} onChange={(e) => setFilters((prev) => ({ ...prev, room_type: e.target.value }))} />
                <TextField label="Check-in" type="date" InputLabelProps={{ shrink: true }} value={filters.check_in} onChange={(e) => setFilters((prev) => ({ ...prev, check_in: e.target.value }))} />
                <TextField label="Check-out" type="date" InputLabelProps={{ shrink: true }} value={filters.check_out} onChange={(e) => setFilters((prev) => ({ ...prev, check_out: e.target.value }))} />
                <TextField label="Guests" type="number" value={filters.guests} onChange={(e) => setFilters((prev) => ({ ...prev, guests: e.target.value }))} />
                <Button variant="contained" onClick={handleSearch}>Search</Button>
              </Stack>

              <Grid container spacing={2} mb={2}>
                {filteredRooms.map((room) => (
                  <Grid item xs={12} md={6} key={room.id}>
                    <Card variant={selectedRoom?.id === room.id ? "elevation" : "outlined"} sx={{ borderColor: selectedRoom?.id === room.id ? "#D4AF37" : "#CBD5E1", cursor: "pointer" }} onClick={() => { setSelectedRoom(room); setForm((prev) => ({ ...prev, room_id: room.id })); }}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between"><Typography fontWeight={700}>{room.room_number}</Typography><Chip label={room.room_type} size="small" /></Stack>
                        <Typography color="text.secondary">Capacity: {room.capacity} · Price: ₹{room.price}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Alert severity="info" sx={{ mb: 2 }}>Selected room will be held for the check-in and check-out window. The system will prevent duplicate reservations.</Alert>

              <Paper sx={{ p: 2, borderRadius: 3, bgcolor: "#F8FAFC" }}>
                <Typography variant="subtitle2" color="text.secondary">Booking Summary</Typography>
                <Typography>Number of Nights: {nights}</Typography>
                <Typography>Room Price: ₹{roomPrice}</Typography>
                <Typography>Taxes: ₹{tax.toFixed(2)}</Typography>
                <Typography>Discount: ₹{discount.toFixed(2)}</Typography>
                <Typography variant="h6" fontWeight={700}>Total Amount: ₹{total.toFixed(2)}</Typography>
              </Paper>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={3}>
                <Button type="submit" variant="contained" disabled={loading} size="large">{loading ? <CircularProgress size={24} /> : "Create Booking"}</Button>
                <Button variant="outlined" onClick={() => navigate("/admin/dashboard")}>Cancel</Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Recent Walk-in Bookings</Typography>
            <Stack spacing={2}>
              {bookings.length === 0 ? <Typography color="text.secondary">No walk-in bookings yet.</Typography> : bookings.slice(0, 6).map((booking) => (
                <Box key={booking.id} sx={{ border: "1px solid #E2E8F0", borderRadius: 3, p: 2 }}>
                  <Typography fontWeight={700}>{booking.customer_name}</Typography>
                  <Typography variant="body2" color="text.secondary">{booking.room_number} · {booking.check_in} to {booking.check_out}</Typography>
                  <Typography variant="body2">Ref: {booking.booking_reference} · Status: {booking.status}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Booking Confirmed</DialogTitle>
        <DialogContent>
          {submittedBooking && <Box>
            <Typography>Booking ID: {submittedBooking.id}</Typography>
            <Typography>Customer: {submittedBooking.customer_name}</Typography>
            <Typography>Room: {submittedBooking.room_number}</Typography>
            <Typography>Check-in: {submittedBooking.check_in}</Typography>
            <Typography>Check-out: {submittedBooking.check_out}</Typography>
            <Typography>Payment Status: {submittedBooking.payment_status}</Typography>
          </Box>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => navigate("/admin/dashboard")}>Go to Dashboard</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default WalkInBooking;
