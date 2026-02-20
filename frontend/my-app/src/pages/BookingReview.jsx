import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Booking.css";

const BookingReview = () => {
  const { listingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { startDate, endDate } = location.state || {};

  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const { data } = await axios.get(`/api/spaces/${listingId}`);
      setListing(data);
    };
    fetchListing();
  }, [listingId]);

  if (!listing) return <div>Loading...</div>;

  const days =
    (new Date(endDate) - new Date(startDate)) /
    (1000 * 60 * 60 * 24);

  const totalPrice = days * listing.price;

  const confirmBooking = async () => {
    try {
      await axios.post(`/api/bookings/${listingId}`, {
        startDate,
        endDate,
      });

      navigate("/booking-success");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <img src={listing.images?.[0]} alt="listing" />

        <div className="review-info">
          <h2>{listing.title}</h2>

          <p>
            {new Date(startDate).toDateString()} →{" "}
            {new Date(endDate).toDateString()}
          </p>

          <div className="price-breakdown">
            <p>{days} days × ${listing.price}</p>
            <h3>Total: ${totalPrice}</h3>
          </div>

          <button onClick={confirmBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingReview;
