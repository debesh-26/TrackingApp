import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setisAuthenticated }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[loading,setloading]=useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password
      });

      const token=response.data.token;
      localStorage.setItem("token", token);
      setisAuthenticated(true);
      navigate("/");
    } catch (error) {
      setError((error.response.data.msg+" Please Register").toUpperCase());
    }finally{
      setloading(false);
    }
  };
  const goToRegisterinPage=()=>{
    navigate('/register')
  }

  return (
    <div className="body">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="loginFailed" style={{ color: "red" }}>{error}</p>}

        {loading && <div className="loader-overlay">
          <div className="loader"></div>
        </div>}

        <form onSubmit={handleLogin} className={loading ? "dimmed" : ""}>
          <div className="form-group">
            <label htmlFor="username">username:</label>
            <input
              className="in"
              type="username"
              id="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            Login
          </button>
          <button type="submit" className="button" onClick={goToRegisterinPage} disabled={loading}>
            Don't have a account ? Register Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
