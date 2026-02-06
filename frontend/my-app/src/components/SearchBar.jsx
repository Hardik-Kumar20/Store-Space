import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchBox.css"

const SearchBar = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    checkin: "",
    checkout: "",
    size: ""
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!formData.location.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/mainpage/autocomplete/api?text=${encodeURIComponent(
            formData.location
          )}`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [formData.location]);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.checkout) <= new Date(formData.checkin)) {
      setError("Checkout date must be after check-in date");
      return;
    }

    try {
      const res = await fetch("/mainpage/searchBar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) navigate("/search-results");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`search-card ${focused ? "focused" : ""}`}>
      <form onSubmit={handleSubmit}>
        {/* LOCATION */}
        <div className="input-group">
          <span className="icon">📍</span>
          <input
            type="text"
            name="location"
            placeholder="Where"
            value={formData.location}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
            required
          />

          {(loading || suggestions.length > 0) && (
            <ul className="suggestions">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="skeleton"></li>
                  ))
                : suggestions.map((place, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        setFormData({ ...formData, location: place });
                        setSuggestions([]);
                      }}
                    >
                      {place}
                    </li>
                  ))}
            </ul>
          )}
        </div>

        {/* CHECK-IN */}
        <div className="input-group">
          <span className="icon">📅</span>
          <input
            type="date"
            name="checkin"
            value={formData.checkin}
            onChange={handleChange}
            required
          />
        </div>

        {/* CHECK-OUT */}
        <div className="input-group">
          <span className="icon">📅</span>
          <input
            type="date"
            name="checkout"
            value={formData.checkout}
            onChange={handleChange}
            required
          />
        </div>

        {/* SIZE */}
        <div className="input-group">
          <span className="icon">📦</span>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button type="submit">🔍 Search</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchBar;
