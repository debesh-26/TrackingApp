import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ isauthenticated, setisAuthenticated, setadmin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setisAuthenticated(false);
    navigate("/");
  };

  const handleadmin = () => {
    setadmin(true);
  };

  return (
    <header className="header">
      <h1>Tracking</h1>
      <button onClick={handleadmin}>Admin Dashboard</button>
      <div className="auth-buttons">
        {isauthenticated ? (
          <>
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="register-btn" onClick={handleRegister}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
