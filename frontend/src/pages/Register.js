import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      await axios.post("http://localhost:3000/auth/register", {
        username,
        password
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {      
      setError((error.response.data.message).toUpperCase());
    } finally {
      setloading(false);
    }
  };
  const goToLoginPage = () => {
    navigate("/login");
  };
  return (
    <div className="body">
      <div className="login-container">
        <h2>Register</h2>
        {error && (
          <p className="Regfailed" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
        <form onSubmit={handleRegister} className={loading ? "dimmed" : ""}>
          <div className="form-group">
            <label htmlFor="username">username:</label>
            <input
              className="in"
              type="username"
              id="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="in"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
          <button type="submit" className="button" onClick={goToLoginPage}>
            Already have a account ? Login Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
