import { Link } from "react-router-dom";
import "../styles/ListingCards.css"

const ListingCard = ({Listing}) => {
    return(
        <Link to={`/listing/${Listing._id}`} className="card">
            <img src={Listing.images?.[0]} alt={Listing.title} />

            <div className="card-content">
                <h3 className="card-title">{listing.title}</h3>
                <p className="card-location">{listing.location.city}</p>
                <p className="card-price">${listing.pricePerDay} / day</p>
            </div>
        </Link>
    );
};

export default ListingCard