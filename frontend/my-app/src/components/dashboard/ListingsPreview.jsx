import { useNavigate } from "react-router-dom";

const ListingsPreview = ({ listings }) => {
  const navigate = useNavigate();

  return (
    <section>
      <h3>Your Listings</h3>

      <div className="listing-grid">
        {listings?.length === 0 && (
          <p>No listings yet. Start by adding one.</p>
        )}

        {listings?.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h4>{listing.title}</h4>
            <p>${listing.pricePerDay} / day</p>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate(`/dashboard/my-listings/${listing._id}`)
              }
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListingsPreview;
