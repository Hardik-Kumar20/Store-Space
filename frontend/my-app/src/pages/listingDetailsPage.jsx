import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import axios from "axios";
import "../styles/ListingDetailPage.css";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!listing) return <div>Listing not found</div>;

  const days =
    (selectionRange.endDate - selectionRange.startDate) /
    (1000 * 60 * 60 * 24);

  const totalPrice = days * listing.price;

  const handleReserve = () => {
    if (days <= 0) {
      alert("Please select valid dates");
      return;
    }

    navigate(`/booking/${listing._id}`, {
      state: {
        startDate: selectionRange.startDate,
        endDate: selectionRange.endDate,
      },
    });
  };

  return (
    <div className="detailContainer">
      {/* Image Gallery */}
      <div className="gallery">
        {listing.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Listing ${index}`}
          />
        ))}
      </div>

      <h1>{listing.title}</h1>
      <p>
        {listing.location?.city}, {listing.location?.state}
      </p>

      <div className="layout">
        <div className="left">
          <h2>Description</h2>
          <p>{listing.description}</p>
        </div>

        <div className="right">
          <div className="booking-card">
            <h2>${listing.price} / day</h2>

            <DateRange
              ranges={[selectionRange]}
              onChange={(item) =>
                setSelectionRange(item.selection)
              }
              minDate={new Date()}
            />

            {days > 0 && (
              <div className="price-preview">
                <p>
                  {days} days × ${listing.price}
                </p>
                <h3>Total: ${totalPrice}</h3>
              </div>
            )}

            <button
              className="reserve-button"
              onClick={handleReserve}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
