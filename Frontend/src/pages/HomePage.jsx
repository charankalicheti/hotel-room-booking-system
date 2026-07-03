import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="page-shell home-page">
      <div className="hero-card glass-card hero-grid">
        <div className="hero-copy-block">
          <p className="eyebrow">Welcome to Aurora Stay</p>
          <h1>Discover your ideal room with a polished booking experience.</h1>
          <p className="hero-intro">
            Browse available rooms, compare amenities, and book instantly with confidence.
            Our sleek interface keeps every reservation simple, fast, and secure.
          </p>

          <div className="hero-buttons">
            <Link to="/rooms" className="primary hero-btn">Browse rooms</Link>
            <Link to="/auth" className="secondary hero-btn">Sign in / Register</Link>
          </div>
        </div>

        <div className="hero-feature-panel">
          <div className="feature-top glass-card">
            <p>Best value stays in one place</p>
            <div className="feature-highlight">Instant booking · Verified rooms · Contactless check-in</div>
          </div>
          <div className="feature-list glass-card">
            <div>
              <h3>Fast search</h3>
              <p>Find available rooms in seconds by date, capacity, and price.</p>
            </div>
            <div>
              <h3>Real results</h3>
              <p>Always up-to-date room availability with live backend data.</p>
            </div>
            <div>
              <h3>Guest ready</h3>
              <p>Clean, modern rooms with flexible guest policies and easy booking.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-panels">
        <article className="glass-card small-panel">
          <h2>Quick booking</h2>
          <p>Reserve your room with just a few clicks and get instant confirmation.</p>
        </article>
        <article className="glass-card small-panel">
          <h2>Flexible options</h2>
          <p>Choose from standard, deluxe and premium rooms with transparent pricing.</p>
        </article>
        <article className="glass-card small-panel">
          <h2>Secure access</h2>
          <p>Login safely and manage reservations from your profile dashboard.</p>
        </article>
      </div>
    </section>
  );
}
