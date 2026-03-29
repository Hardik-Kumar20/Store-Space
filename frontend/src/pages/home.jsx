import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import "../styles/home.css";
import { Link } from "react-router-dom";

// 🔥 IMPORT IMAGE (IMPORTANT)
import heroImg from "../assets/images/herostorage.png";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="hero-content">
          <h1>Find Safe Storage Near You</h1>
          <p>Store luggage, boxes, or furniture with trusted hosts.</p>

          <SearchBar />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 11c1.1 0 2 .9 2 2v3h-4v-3c0-1.1.9-2 2-2zm6-2V7a6 6 0 10-12 0v2H4v10h16V9h-2z"/>
            </svg>
          </div>
          <h3>Secure Storage</h3>
          <p>Verified hosts & safe locations</p>
        </div>

        <div className="feature-card">
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z"/>
              <circle cx="12" cy="11" r="2" />
            </svg>
          </div>
          <h3>Nearby Locations</h3>
          <p>Find storage near you instantly</p>
        </div>

        <div className="feature-card">
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 7h.01M3 11l8-8h6v6l-8 8-6-6z"/>
            </svg>
          </div>
          <h3>Affordable Pricing</h3>
          <p>Pay only for the space you need</p>
        </div>

      </section>

      <Footer />
    </>
  );
};

export default Home;