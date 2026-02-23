import { useEffect, useState } from "react";
import axios from "axios";

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try{
                const res = await axios.get("/api/bookings/my-bookings", {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if(!res.data.success) {
                    console.error("Failed to fetch bookings");
                }
                setBookings(res.data.bookings);
            }catch(error){
                console.error("Error fetching bookings:", error);
            }
        }
        fetchBookings();
    }, []);


    return(
        <div>
            <h2>MyBookings</h2>
            {bookings.length === 0 && <p>You have no bookings yet.</p>}
            {bookings.map((booking) => {
                <div key={booking.id} className="booking-card">
                    <img src={booking.listing.images[0]} alt="" srcset="" width="200" />
                    <h3>{booking.listing.title}</h3>
                    <p>
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p>Total: {booking.totalprice}</p>
                    <p>Status: {booking.status}</p>
                </div>
            })}
        </div>
    )




}


export default MyBooking;