import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HotelCard from "../../components/ui/HotelCard";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Perfect Stay</h1>

        <p>
          Luxury hotels, comfortable rooms, and the best prices for your next
          trip.
        </p>

        {/* Search Section */}
        <div className="search-box">
          <input type="text" placeholder="📍 Destination" />

          <input type="date" />

          <input type="date" />

          <select>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
          </select>
        </div>

        <button>Explore Rooms</button>
      </section>

      {/* Featured Hotels */}
      <section className="featured-hotels">
        <h2>Featured Hotels</h2>

        <div className="hotel-list">
          <HotelCard
            name="Luxury Hotel"
            location="Hyderabad"
            price="5000"
            rating="★★★★★"
          />

          <HotelCard
            name="Beach Resort"
            location="Goa"
            price="8500"
            rating="★★★★★"
          />

          <HotelCard
            name="Business Hotel"
            location="Bangalore"
            price="4200"
            rating="★★★★☆"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Us</h2>

        <div className="features">
          <div>✔ Best Price Guarantee</div>

          <div>✔ Secure Booking</div>

          <div>✔ 24/7 Customer Support</div>

          <div>✔ Easy Cancellation</div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;