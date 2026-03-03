import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/Booking.css";
import { useAuth } from "../components/AuthContext";


const BookingReview = () => {
  const { id } = useParams();
  console.log("listingId:", id);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  if (!startDate || !endDate) {
    return <div>Missing booking dates</div>;
  }

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(
          `/api/listings/${id}`
        );
        setListing(data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!listing) return <div>Listing not found</div>;

  const days =
    (new Date(endDate) - new Date(startDate)) /
    (1000 * 60 * 60 * 24);

  const totalPrice = days * listing.pricePerDay;

  const confirmBooking = async () => {
    try {
      await axios.post(
        `/api/bookings`,
        {
          listingId: id,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );

      setTimeout(() => {
        navigate("/booking-success");
      },3000)
      
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
            <p>{days} days × ${listing.pricePerDay}</p>
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