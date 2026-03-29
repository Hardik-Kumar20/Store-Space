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

        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 250);
    return () => clearTimeout(debounce);
  }, [formData.location]);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "location") {
      setFocused(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(formData.checkout) <= new Date(formData.checkin)) {
      setError("Checkout must be after check-in");
      return;
    }

    navigate(
      `/search?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}`
    );
  };

  return (
    <div className={`srchBar ${focused ? "focused" : ""}`}>
      <form onSubmit={handleSubmit}>
        <div className="input-group" ref={wrapperRef}>
          <span className="icon">📍</span>

          <input
            type="text"
            name="location"
            placeholder="Where"
            value={formData.location}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
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
                      onMouseDown={() => {
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

        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleChange}
        />

        <button>Search</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchBar;