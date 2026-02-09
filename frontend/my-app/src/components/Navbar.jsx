import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🌙 Theme handling
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 🔐 Check auth status from backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/me", {
          credentials: "include"
        });

        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include"
      });

      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (checkingAuth) return null; // prevents flicker

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

          {!isLoggedIn && (
            <span className="nav-link" onClick={() => navigate("/login")}>
              Login
            </span>
          )}

          {isLoggedIn && (
            <span className="nav-link" onClick={handleLogout}>
              Logout
            </span>
          )}

          <button
            className="host-btn"
            onClick={() =>
              isLoggedIn
                ? navigate("/host/store-details")
                : navigate("/login")
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
