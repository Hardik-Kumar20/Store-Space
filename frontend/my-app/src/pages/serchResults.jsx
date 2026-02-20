import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import "../styles/SearchResult.css";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  const location = searchParams.get("location") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const size = searchParams.get("size") || "";
  const sort = searchParams.get("sort") || "";

  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);



  useEffect(() => {
    fetchListings();
  }, [searchParams]);

  const fetchListings = async () => {
    try {
      setLoading(true);

      const query = searchParams.toString();
      const res = await fetch(`/api/listings?${query}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Error:", errorText);
        return;
      }

      const data = await res.json();

      setListings(data.listings || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({
        location,
        page: 1,
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
        size,
        sort
      });
    }, 500); // 500ms delay
  
    return () => clearTimeout(timeout);
  }, [localMinPrice, localMaxPrice]);
  

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setSearchParams({
      location,
      page: 1,
      ...newFilters
    });
  };

  return (
    <div className="search-page">
      <h2 className="search-heading">Spaces in {location}</h2>

      {/* FILTER UI */}
      <div className="filters">
        <input
          type="number"
          placeholder="Min Price"
          value={localMinPrice}
          onChange={(e) =>
            setLocalMinPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={localMaxPrice}
          onChange={(e) =>
            setLocalMaxPrice(e.target.value)
          }
        />

        <select
          value={size}
          onChange={(e) =>
            handleFilterChange({
              minPrice,
              maxPrice,
              size: e.target.value
            })
          }
        >
          <option value="">All Sizes</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select
        value={sort}
        onChange={(e) =>
            setSearchParams({
            location,
            page: 1,
            minPrice,
            maxPrice,
            size,
            sort: e.target.value
            })
        }
        >
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest</option>
</select>

      </div>

      {loading && <p>Loading...</p>}

      {!loading && listings.length === 0 && (
        <div className="empty-state">
          No spaces found.
        </div>
      )}

      <div className="listing-grid">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() =>
          {
            const params = {
              location,
              page: page - 1,
              minPrice,
              maxPrice,
              size
             };
             setSearchParams(params);
            }
          }
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>{
            const params = {
              location,
              page: page + 1,
              minPrice,
              maxPrice,
              size
            };
            setSearchParams(params)
          }
          }
          >
            Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults; 
