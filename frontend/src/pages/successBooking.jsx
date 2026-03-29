// ...existing code...
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Booking.css';
const BookingSuccess = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds <= 0) {
      navigate("/my-bookings");
      return;
    }
    const interval = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, navigate]);

  return (
    <div className="booking-success-page">
      <div className="booking-success-card">
        <h1>Booking Confirmed 🎉</h1>
        <p className="booking-message">Your storage space has been reserved.</p>
        <p className="redirect-note">
          Redirecting to My Bookings in <span className="countdown">{seconds}</span> seconds.
        </p>
        <button className="btn-primary" onClick={() => navigate("/my-bookings")}>
          Go to My Bookings now
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
// ...existing code...