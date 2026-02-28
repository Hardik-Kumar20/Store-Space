import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../styles/login.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


<Link to={"/signup"}>Signup</Link>

const Login = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    userPass: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userName: formData.userName.trim(),
        password: formData.userPass.trim()
      };

      const res = await fetch("/api/login/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        localStorage.setItem("authToken", result.token);
        
        const redirect = searchParams.get("redirect");
        if(redirect === "dashboard"){
          navigate("/dashboard");
        }else{
          navigate("/");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error in login the user:", error);
    }
  };

  return (
    <>
    <Navbar />

    <div className="login-page">
      {/* LOGO */}
      <div className="logo">
        <h3><span className="store">Store</span><span className="space">Space</span></h3>
      </div>

      {/* CONTAINER */}
      <div className="container">
        <div className="heading">
          <h2>Host Login</h2>
        </div>

        <div className="login">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="userPass"
              placeholder="password"
              value={formData.userPass}
              onChange={handleChange}
              required
            />

            <input type="submit" value="submit" id="btn" />
          </form>

          <p>
            Don’t have an account?
            <span onClick={() => navigate("/signup")}> SignUp</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
