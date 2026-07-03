import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import AuthPage from './pages/AuthPage';

const API_BASE = 'http://127.0.0.1:8000';

function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminBookings') || '[]');
    } catch (error) {
      return [];
    }
  });
  const [newRoom, setNewRoom] = useState({
    room_number: '',
    room_type: 'Standard',
    price: 120,
    capacity: 2,
    description: '',
    is_available: true,
  });

  const isAdmin = useMemo(() => role === 'admin', [role]);

  useEffect(() => {
    fetchRooms();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('adminBookings', JSON.stringify(bookings));
  }, [bookings]);

  async function fetchRooms() {
    try {
      const response = await fetch(`${API_BASE}/rooms/`);
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage('Unable to load rooms right now.');
    }
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
    const payload = mode === 'login'
      ? new URLSearchParams({ username: form.email, password: form.password })
      : JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role,
        });

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: mode === 'login'
          ? { 'Content-Type': 'application/x-www-form-urlencoded' }
          : { 'Content-Type': 'application/json' },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Request failed');
      }

      if (mode === 'login') {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);
        setToken(data.access_token);
        setRole(data.role);
        setMessage('Logged in successfully.');
        navigate('/rooms');
      } else {
        setMode('login');
        setMessage('Registration successful. You can now log in.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddRoom(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    if (!newRoom.room_number) {
      setMessage('Please provide a room number.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/rooms/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRoom),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Unable to create room');
      }

      setMessage(`Room ${data.room_number} added.`);
      setNewRoom({ room_number: '', room_type: 'Standard', price: 120, capacity: 2, description: '', is_available: true });
      setShowAddForm(false);
      fetchRooms();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteRoom(roomId) {
    if (!window.confirm('Delete this room permanently?')) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Unable to delete room');
      }

      setMessage(data.message || 'Room deleted successfully.');
      fetchRooms();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleBookingCreated(booking) {
    const normalizedBooking = {
      id: booking?.id ?? Date.now(),
      customer_name: booking?.customer_name || booking?.customerName || 'Guest',
      room_id: booking?.room_id ?? booking?.roomId ?? null,
      room_number: booking?.room_number || booking?.roomNumber || '',
      check_in: booking?.check_in || booking?.checkIn || '',
      check_out: booking?.check_out || booking?.checkOut || '',
      guests: booking?.guests ?? 1,
      total_price: booking?.total_price ?? booking?.totalPrice ?? 0,
      status: booking?.status || 'BOOKED',
      created_at: booking?.created_at || booking?.createdAt || new Date().toISOString(),
    };

    setBookings((current) => [normalizedBooking, ...current]);
    setMessage('Booking created successfully.');
  }

  function handleDeleteBooking(bookingId) {
    if (!window.confirm('Delete this booking permanently?')) {
      return;
    }

    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
    setMessage('Booking deleted successfully.');
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    setRooms([]);
    setMessage('Logged out.');
    navigate('/');
  }

  return (
      <div className="app-shell">
        <NavBar token={token} role={role} onLogout={handleLogout} />

        <main className="content-window">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/rooms"
              element={
                <RoomsPage
                  rooms={rooms}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteRoom}
                  token={token}
                  showAddForm={showAddForm}
                  setShowAddForm={setShowAddForm}
                  newRoom={newRoom}
                  setNewRoom={setNewRoom}
                  handleAddRoom={handleAddRoom}
                  loading={loading}
                  bookings={bookings}
                  onBookingCreated={handleBookingCreated}
                  onDeleteBooking={handleDeleteBooking}
                />
              }
            />
            <Route
              path="/auth"
              element={
                <AuthPage
                  mode={mode}
                  setMode={setMode}
                  form={form}
                  onChange={setForm}
                  onSubmit={handleAuthSubmit}
                  loading={loading}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {message && <div className="toast">{message}</div>}
      </div>
  );
}

export default App;
