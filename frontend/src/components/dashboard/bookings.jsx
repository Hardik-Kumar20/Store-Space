import { useEffect, useState } from "react";
import axios from "axios";

const HostBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {
      const res = await axios.get("/api/bookings/host", {
        withCredentials: true
      });

      setBookings(res.data);
    };

    fetchBookings();

  }, []);

  const updateStatus = async (id, status) => {

    await axios.patch(`/api/dashboard/${id}`,
      { status },
      { withCredentials: true }
    );

    setBookings(prev =>
      prev.map(b =>
        b._id === id ? { ...b, status } : b
      )
    );
  };

  return (
    <div>

      <h2>Booking Requests</h2>

      {bookings.map(b => (

        <div key={b._id} className="booking-card">

          <h4>{b.listing.title}</h4>

          <p>Customer: {b.customer?.userName}</p>
          <p>Email: {b.customer?.userEmail}</p>

          <p>Status: {b.status}</p>

          <p>
            {new Date(b.startDate).toLocaleDateString()}
            {" "}→{" "}
            {new Date(b.endDate).toLocaleDateString()}
          </p>

          <p>Total: ${b.totalPrice}</p>

          {b.status === "pending" && (
            <>
              <button
                onClick={() => updateStatus(b._id, "confirmed")}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(b._id, "cancelled")}
              >
                Reject
              </button>
            </>
          )}

        </div>

      ))}

    </div>
  );
};

export default HostBookings;