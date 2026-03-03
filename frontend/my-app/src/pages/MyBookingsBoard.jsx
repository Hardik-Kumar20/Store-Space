import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "/api/bookings/my-bookings",
          { withCredentials: true }
        );

        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Fetch bookings error:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="bookings-loader">
        <div className="spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookings-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-image-wrapper">
                <img
                  src={booking.listing?.images?.[0]}
                  alt={booking.listing?.title}
                />
                <span className={`status-badge ${booking.status}`}>
                  {booking.status}
                </span>
              </div>

              <div className="booking-content">
                <h3>{booking.listing?.title}</h3>

                <p className="booking-location">
                  {booking.listing?.address}, {booking.listing?.city}
                </p>

                <p className="booking-dates">
                  {new Date(booking.startDate).toLocaleDateString()} —{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>

                <p className="booking-price">
                  ₹ {booking.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;