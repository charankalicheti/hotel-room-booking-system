import { useEffect, useMemo, useState } from 'react';
import AuthForm from './components/AuthForm';
import RoomForm from './components/RoomForm';
import RoomGrid from './components/RoomGrid';

const API_BASE = 'http://127.0.0.1:8000';

function App() {
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
    if (token) {
      fetchRooms();
    }
  }, [token]);

  async function fetchRooms() {
    try {
      const response = await fetch(`${API_BASE}/rooms/`);
      const data = await response.json();
      setRooms(data);
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

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    setRooms([]);
    setMessage('Logged out.');
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Hotel Booking Admin</p>
          <h1>Stylish room management for your property.</h1>
          <p className="hero-copy">Authenticate, publish rooms, and manage inventory with a modern admin dashboard.</p>
        </div>
      </header>

      <main className="content-grid">
        <section className="card auth-panel">
          <div className="tabs">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
            <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
          </div>
          <AuthForm mode={mode} form={form} onChange={setForm} onSubmit={handleAuthSubmit} loading={loading} />
        </section>

        <section className="card room-panel">
          <div className="toolbar">
            <div>
              <h2>Available Rooms</h2>
              <p className="subtitle">Browse the latest rooms and manage inventory.</p>
            </div>
            {token && (
              <button className="secondary" onClick={handleLogout}>Logout</button>
            )}
          </div>

          {token && isAdmin && (
            <div className="room-actions">
              <button className="primary" onClick={() => setShowAddForm((value) => !value)}>
                {showAddForm ? 'Hide room form' : 'Add new room'}
              </button>
            </div>
          )}

          {showAddForm && isAdmin && (
            <RoomForm
              newRoom={newRoom}
              onChange={setNewRoom}
              onSubmit={handleAddRoom}
              onCancel={() => { setShowAddForm(false); setNewRoom({ room_number: '', room_type: 'Standard', price: 120, capacity: 2, description: '', is_available: true }); }}
              loading={loading}
            />
          )}

          {rooms.length === 0 ? (
            <p className="empty-state">No rooms available. Add a room to get started.</p>
          ) : (
            <RoomGrid rooms={rooms} isAdmin={isAdmin} onDelete={handleDeleteRoom} />
          )}
        </section>
      </main>

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default App;
