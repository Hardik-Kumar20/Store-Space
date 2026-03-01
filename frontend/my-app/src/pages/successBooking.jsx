import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/my-bookings");
  }, 5000);
    <div>
      <h1>Booking Confirmed 🎉</h1>
      <p>Your storage space has been reserved.</p>
    </div>
};

  export default BookingSuccess;