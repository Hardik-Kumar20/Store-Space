import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header className="header">
      <nav className="navbar">

        {/* LEFT */}
        <div className="nav-left" onClick={() => navigate("/")}>
          Store<span>Space</span>
        </div>

        {/* CENTER */}
        <ul className="nav-center">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About Us</li>
          <li onClick={() => navigate("/contact")}>Contact Us</li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!token && (
            <span className="nav-link" onClick={() => navigate("/login")}>
              Login
            </span>
          )}

          <button
            className="host-btn"
            onClick={() =>
              token ? navigate("/host/store-details") : navigate("/login")
            }
          >
            Become a Host
          </button>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
