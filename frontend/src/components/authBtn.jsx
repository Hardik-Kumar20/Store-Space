import { useNavigate } from "react-router-dom";

const AuthButton = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
      });

      if (res.ok) {
        // backend cleared cookie successfully
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Logout failed on server");
      }
    } catch (err) {
      console.error("Logout request failed", err);
    }
  };

  if (!isLoggedIn) {
    return (
      <span className="nav-link" onClick={() => navigate("/login")}>
        Login
      </span>
    );
  }

  return (
    <span className="nav-link" onClick={handleLogout}>
      Logout
    </span>
  );
};

export default AuthButton;
