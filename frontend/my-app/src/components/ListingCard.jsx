import { Link } from "react-router-dom";
import "../styles/ListingCards.css"

const ListingCard = ({listing}) => {
    return(
        <Link to={`/listingDetails/${listing._id}`} className="card">
            <img src={listing.images?.[0]} alt={listing.title} />

            <div className="card-content">
                <h3 className="card-title">{listing.title}</h3>
                <p className="card-location">
                    {[listing.address, listing.city, listing.state]
                        .filter(Boolean)
                        .join(", ")}
                </p>
                <p className="card-price">${listing.pricePerDay} / day</p>
            </div>
        </Link>
    );
};

export default ListingCard