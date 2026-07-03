import { NavLink } from 'react-router-dom';

export default function NavBar({ token, role, onLogout }) {
  return (
    <header className="topbar glass-card">
      <div className="brand-block">
        <span className="brand-logo">⭐</span>
        <div>
          <p className="brand-title">Aurora Stay</p>
          <p className="brand-subtitle">Modern room booking experience</p>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        <NavLink to="/auth">{token ? 'Account' : 'Login'}</NavLink>
        {token && (
          <button type="button" className="ghost" onClick={onLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
