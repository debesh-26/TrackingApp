import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Home.css";
import AdminDashboard from "../components/AdminDashboard";
import LocationTracker from "../components/LocationTracker";

const Home = () => {
  const [isauthenticated, setisAuthenticated] = useState(false);
  const [admin, setadmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header
        setisAuthenticated={setisAuthenticated}
        isauthenticated={isauthenticated}
        setadmin={setadmin} 
      />
      {
  isauthenticated ? (
    admin ? (
      <AdminDashboard />
    ) : (
      <div style={{ marginTop: "100px" }}>
        <LocationTracker />
      </div>
    )
  ) : null
}

    </> 
  );
};

export default Home;
