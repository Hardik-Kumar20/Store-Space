import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css"

const ListingsPreview = ({ listings }) => {

  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <section className="listings-section">

      <h3>Your Listings</h3>

      <div className="listing-grid">

        {listings?.length === 0 && (
          <p>No listings yet. Start by adding one.</p>
        )}

        {listings?.map((listing) => (

          <div
            key={listing._id}
            className="listing-card"
            onClick={() => setSelectedListing(listing)}
          >

            <img
              src={listing.images?.[0] || "/placeholder.jpg"}
              alt={listing.title}
              className="listing-image"
            />

            <div className="listing-info">

              <h4>{listing.title}</h4>

              <p className="price">
                ${listing.pricePerDay} / day
              </p>

              <p className="bookings">
                {listing.bookings || 0} bookings
              </p>

            </div>

            <button
              className="manage-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/dashboard/my-listings/${listing._id}`);
              }}
            >
              Manage
            </button>

          </div>

        ))}

      </div>

      {/* Preview Modal */}

      {selectedListing && (

        <div
          className="preview-overlay"
          onClick={() => setSelectedListing(null)}
        >

          <div
            className="preview-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedListing.images?.[0] || "/placeholder.jpg"}
              alt={selectedListing.title}
              className="preview-image"
            />

            <h2>{selectedListing.title}</h2>

            <p>
              Price: ${selectedListing.pricePerDay} / day
            </p>

            <p>
              Total bookings: {selectedListing.bookings || 0}
            </p>

            <p>
              Status: {selectedListing.approvalStatus}
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                navigate(`/dashboard/my-listings/${selectedListing._id}`)
              }
            >
              Manage Listing
            </button>

          </div>

        </div>

      )}

    </section>
  );
};

export default ListingsPreview;