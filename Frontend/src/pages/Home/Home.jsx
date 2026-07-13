import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getHotel } from "../../services/hotelService";
import "./Home.css";

function Home() {
  // =====================================================
  // Hotel State
  // =====================================================

  const [hotel, setHotel] = useState({
    id: null,
    name: "",
    location: "",
    rooms: 0,
  });

  const [loading, setLoading] = useState(true);

  // =====================================================
  // Load Hotel Details
  // =====================================================

  useEffect(() => {
    loadHotel();
  }, []);

  const loadHotel = async () => {
    try {
      const data = await getHotel();

      console.log("Home Hotel Response:", data);

      setHotel(data);
    } catch (error) {
      console.error(
        "Failed to load hotel details:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Loading Hotel...</h2>
        </div>

        <Footer />
      </>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Navbar />

      {/* =================================================
          Hero Section
      ================================================= */}

      <section className="hero">
        <h1>
          Welcome to {hotel.name}
        </h1>

        <p>
          Experience luxury, comfort, and unforgettable
          hospitality in the heart of {hotel.location}.
        </p>
      </section>

      {/* =================================================
          Our Hotel
      ================================================= */}

      <section className="featured-hotels">
        <h2>Our Hotel</h2>

        <div className="hotel-banner">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
            alt={hotel.name}
          />

          <div className="hotel-info">
            <h3>
              {hotel.name}
            </h3>

            <p className="location">
              📍 {hotel.location}
            </p>

            <p>
              {hotel.name} offers luxurious rooms,
              premium amenities, world-class hospitality,
              and a comfortable stay for business and
              leisure travelers.
            </p>

            <div className="hotel-features">
              <span>✔ Free WiFi</span>

              <span>✔ Swimming Pool</span>

              <span>✔ Restaurant</span>

              <span>✔ Free Parking</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          Why Choose Us
      ================================================= */}

      <section className="why-us">
        <h2>
          Why Choose Us
        </h2>

        <div className="features">
          <div>
            ✔ Best Price Guarantee
          </div>

          <div>
            ✔ Secure Booking
          </div>

          <div>
            ✔ 24/7 Customer Support
          </div>

          <div>
            ✔ Easy Cancellation
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;