import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/ListingDetailPage.css";



const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("ListingDetails rendered");
  console.log("User value:", user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        setListing(data);
        setSelectedImage(data.images?.[0]);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!listing) return <div className="loader">Listing not found</div>;

  const days =
    (selectionRange.endDate - selectionRange.startDate) /
    (1000 * 60 * 60 * 24);

  const totalPrice = days * listing.pricePerDay;

  const handleReserve = async () => {
    if (days <= 0) {
      alert("Please select valid dates");
      return;
    }

    if (!user) {
      navigate("/login", {
        state: { 
          from: `/bookingReview/${id}?start=${selectionRange.startDate.toISOString()}&end=${selectionRange.endDate.toISOString()}`
        }
      });
      return;
    }

    navigate(
      `/bookingReview/${id}?start=${selectionRange.startDate.toISOString()}&end=${selectionRange.endDate.toISOString()}`
    );


    console.log("User in ListingDetails:", user);
  };

  return (
    <div className="detail-container">

      {/* HERO  SECTION */}
      {/* IMAGE SECTION */}
      <div className="hero-section">
      <img src={selectedImage} alt="Listing" className="hero-image" />

      <div className="hero-overlay">
        <h1>{listing.title}</h1>
        <p>📍 {listing.address}, {listing.city}, {listing.state}</p>
      </div>

      <div className="price-badge">
        ${listing.pricePerDay} / day
      </div>

      <div className="thumbnail-bar">
        {listing.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            className={selectedImage === img ? "thumb active" : "thumb"}
            onClick={() => setSelectedImage(img)}
            alt="thumb"
          />
        ))}
      </div>
    </div>


      {/* TITLE SECTION */}
      <div className="title-section">
        <h1>{listing.title}</h1>
        <p>
          📍 {listing.address}, {listing.city}, {listing.state}
        </p>
      </div>

      <div className="detail-layout">

        {/* Feature Section */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <div>
              <h4>{listing.size} sq ft</h4>
              <p>Storage Capacity</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌡</div>
            <div>
              <h4>{listing.temperatureControlled ? "Yes" : "No"}</h4>
              <p>Temperature Controlled</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📹</div>
            <div>
              <h4>{listing.securityCameras ? "Yes" : "No"}</h4>
              <p>Security Cameras</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🕒</div>
            <div>
              <h4>{listing.access24hr ? "Yes" : "No"}</h4>
              <p>24 Hour Access</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BOOKING CARD */}
        <div className="booking-card">
          <h2>${listing.pricePerDay} <span>/ day</span></h2>

          <DateRange
            ranges={[selectionRange]}
            onChange={(item) => setSelectionRange(item.selection)}
            minDate={new Date()}
          />

          {days > 0 && (
            <div className="price-summary">
              <p>{days} days × ${listing.pricePerDay}</p>
              <h3>Total: ${totalPrice}</h3>
            </div>
          )}

          <button className="reserve-btn" onClick={handleReserve}>
            Reserve Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ListingDetails;