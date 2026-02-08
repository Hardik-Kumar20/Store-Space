import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
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

    const data = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      password: formData.userPass
    };

    try {
      const res = await fetch("/signup/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      console.error("Error submitting signup form:", error);
    }
  };

  return (
<>
    <Navbar />

    <div className="signup-page">
      {/* LOGO */}
      <div className="logo">
        <h3><span className="store">Store</span><span className="space">Space</span></h3>
      </div>

      {/* CONTAINER */}
      <div className="container">
        <div className="heading">
          <h2>SignUp</h2>
        </div>

        <div className="signUp">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={formData.userEmail}
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
            Already have an account?
            <span onClick={() => navigate("/login")}> login</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
