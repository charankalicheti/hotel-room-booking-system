import React from "react";
import Navbar from "../../components/Landing/Navbar";
import Hero from "../../components/Landing/Hero";
import FeaturedRooms from "../../components/Landing/FeaturedRooms";
import Amenities from "../../components/Landing/Amenities";
import WhyChooseUs from "../../components/Landing/WhyChooseUs";
import Statistics from "../../components/Landing/Statistics";
import Gallery from "../../components/Landing/Gallery";
import Testimonials from "../../components/Landing/Testimonials";
import About from "../../components/Landing/About";
import Contact from "../../components/Landing/Contact";
import Footer from "../../components/Landing/Footer";
import RestaurantCarousel from "../../components/Landing/RestaurantCarousel";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <FeaturedRooms />

        <Amenities />

        <RestaurantCarousel />

        <WhyChooseUs />

        <Statistics />

        <Gallery />

        <Testimonials />

        <About />

        <Contact />
      </main>

      <Footer />
    </>
  );
}