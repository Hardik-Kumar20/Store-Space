import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import "../styles/home.css";
import { Link } from "react-router-dom";

<>
<Link to={"/about"}>About Us</Link>
<Link to={"/contact"}>Contact Us</Link>
<Link to={"/login"}>Login</Link>
</>
const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Safe Storage Near You</h1>
          <p>Store luggage, boxes, or furniture with trusted hosts.</p>

          <SearchBar />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <img src="/images/secure.jpg" alt="Secure storage" />
          <h3>Secure Storage</h3>
          <p>Verified hosts & safe locations</p>
        </div>

        <div className="feature-card">
          <img src="/images/location.jpg" alt="Nearby locations" />
          <h3>Nearby Locations</h3>
          <p>Find storage near you instantly</p>
        </div>

        <div className="feature-card">
          <img src="/images/price.jpg" alt="Affordable pricing" />
          <h3>Affordable Pricing</h3>
          <p>Pay only for the space you need</p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
