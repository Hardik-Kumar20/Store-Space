import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../components/AuthContext";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    userName: "",
    userPass: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 required for cookies
        body: JSON.stringify({
          userName: formData.userName.trim(),
          password: formData.userPass.trim()
        })
      });

      if (!res.ok) {
        alert("Invalid username or password");
        setLoading(false);
        return;
      }

      // Now fetch authenticated user (cookie already set)
      const userRes = await axios.get("/api/me", {
        withCredentials: true
      });

      setUser(userRes.data);

      // Redirect back to where user came from
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="logo">
          <h3>
            <span className="store">Store</span>
            <span className="space">Space</span>
          </h3>
        </div>

        <div className="container">
          <div className="heading">
            <h2>User Login</h2>
          </div>

          <div className="login">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="userPass"
                placeholder="Password"
                value={formData.userPass}
                onChange={handleChange}
                required
              />

              <button type="submit" id="btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p>
              Don’t have an account?{" "}
              <span
                className="signup-link"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;