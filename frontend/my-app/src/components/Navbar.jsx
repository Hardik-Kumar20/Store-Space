import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });

    setUser(null);
    navigate("/");
  };

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
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">

          <ThemeToggle />

          {!user ? (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="profile-menu">

              {/* PROFILE IMAGE */}
              <div
                className="avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="profile" />
                ) : (
                  <span>{user?.userName?.charAt(0).toUpperCase()}</span>
                )}
              </div>

              {/* DROPDOWN */}
              {menuOpen && (
                <div className="dropdown">

                  <p className="dropdown-user">
                    👋 Welcome back, {user?.userName}
                  </p>
                  <button onClick={() => navigate("/my-bookings")}>
                    My Bookings
                  </button>

                  {user.role === "host" && (
                    <button onClick={() => navigate("/dashboard")}>
                      Host Dashboard
                    </button>
                  )}

                  {user.role === "user" && (
                    <button onClick={() => navigate("/become-host")}>
                      Become a Host
                    </button>
                  )}

                  <button onClick={logout}>
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </nav>
    </header>
  );
};

export default Navbar;