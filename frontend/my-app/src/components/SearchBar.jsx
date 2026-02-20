import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchBox.css";

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

  const wrapperRef = useRef(null);

  /* ===============================
     CLICK OUTSIDE HANDLER
     =============================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     AUTOCOMPLETE (DEBOUNCED)
     =============================== */
  useEffect(() => {
    if (!formData.location.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/mainpage/search?text=${encodeURIComponent(
            formData.location
          )}`
        );

        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }

        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 250);
    return () => clearTimeout(debounce);
  }, [formData.location]);

  /* ===============================
     INPUT CHANGE
     =============================== */
  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // 🔥 reopen suggestions when typing again
    if (e.target.name === "location") {
      setFocused(true);
    }
  };

  /* ===============================
     SUBMIT SEARCH
     =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(formData.checkout) <= new Date(formData.checkin)) {
      setError("Checkout date must be after check-in date");
      return;
    }

    navigate(
      `/search?location=${encodeURIComponent(formData.location)}&checkin=${formData.checkin}&checkout=${formData.checkout}&size=${formData.size}&page=1`
    );
    
    
  };

  return (
    <div className={`search-card ${focused ? "focused" : ""}`}>
      <form onSubmit={handleSubmit}>
        {/* ================= LOCATION ================= */}
        <div className="input-group" ref={wrapperRef}>
          <span className="icon">📍</span>

          <input
            type="text"
            name="location"
            placeholder="Where"
            value={formData.location}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            autoComplete="off"
            required
          />

          {(loading || suggestions.length > 0) && focused && (
            <ul className="suggestions">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="skeleton"></li>
                  ))
                : suggestions.map((place, index) => (
                    <li
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFormData((prev) => ({
                          ...prev,
                          location: place
                        }));
                        setSuggestions([]);
                        setFocused(false);
                      }}
                    >
                      {place}
                    </li>
                  ))}
            </ul>
          )}
        </div>

        {/* ================= CHECK-IN ================= */}
        <div className="input-group">
          <span className="icon">📅</span>
          <input
            type="date"
            name="checkin"
            value={formData.checkin}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        {/* ================= CHECK-OUT ================= */}
        <div className="input-group">
          <span className="icon">📅</span>
          <input
            type="date"
            name="checkout"
            value={formData.checkout}
            onChange={handleChange}
            min={
              formData.checkin ||
              new Date().toISOString().split("T")[0]
            }
            required
          />
        </div>

        {/* ================= SIZE ================= */}
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
