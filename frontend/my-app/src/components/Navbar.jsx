import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./authBtn";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🔐 Check auth status (cookie-based)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include"
        });

        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (checkingAuth) return null; // prevents navbar flicker

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
          <ThemeToggle />

          <AuthButton
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />

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
