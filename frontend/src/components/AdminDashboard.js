import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { fetchUsers, fetchUserLocations } from '../api';
import "./AdminLocationDashboard.css"

const AdminLocationDashboard = () => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);

  const fetchLatestLocations = async (userList) => {
    try {
      const latestLocations = await Promise.all(
        userList.map(async (user) => {
          const locationResponse = await fetchUserLocations(user.id);
          const latestLocation = locationResponse.data.length > 0 
            ? locationResponse.data[locationResponse.data.length - 1] 
            : null;
          
          return latestLocation 
            ? {
                ...latestLocation,
                userId: user.id,
                username: user.username
              } 
            : null;
        })
      );

      const validLocations = latestLocations.filter(location => location !== null);
      
      setLocations(validLocations);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data);
        await fetchLatestLocations(data);
        const intervalId = setInterval(() => {
          fetchLatestLocations(data);
        }, 4000);
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewLocations = async (userId) => {
    try {
      const { data } = await fetchUserLocations(userId);
      const latestLocation = data.length > 0 
        ? data[data.length - 1] 
        : null;

      const userLocations = latestLocation 
        ? [{
            ...latestLocation,
            userId,
            username: users.find(u => u.id === userId).username
          }] 
        : [];

      setLocations(userLocations);
      
      if (userLocations.length > 0) {
        setMapCenter([
          userLocations[0].coordinates.lat, 
          userLocations[0].coordinates.lon
        ]);
      }
      setSelectedUser(userId);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  return (
    <div className="user-container">
  <div className="user-list">
    <h2 className="user-list-heading">Registered Users</h2>
    <ul className="user-list-items">
      {users.map((user) => (
        <li 
          key={user.id} 
          className={`user-item ${selectedUser === user.id ? 'user-item-selected' : ''}`}
        >
          <span className="user-name">{user.username}</span>
          <button 
            onClick={() => handleViewLocations(user.id)}
            className="view-location-button"
          >
            View Latest Location
          </button>
        </li>
      ))}
    </ul>
  </div>
  <div className="user-map-container">
    <h2 className="map-heading">User Locations</h2>
    <div className="map-box">
      <Map
        height={600}
        center={mapCenter}
        zoom={10}
        animate={true}
      >
        {locations.map((location, index) => (
          <Marker
            key={location.userId}
            width={50}
            anchor={[location.coordinates.lat, location.coordinates.lon]}
            color="#2563eb"
            onClick={() => {
              alert(`User: ${location.username}\nTimestamp: ${location.timestamp}\nLat: ${location.coordinates.lat.toFixed(4)}, Lon: ${location.coordinates.lon.toFixed(4)}`);
            }}
          />
        ))}
      </Map>
    </div>
    <div className="location-details">
      <h3 className="location-details-heading">Latest Location Details</h3>
      <ul className="location-details-list">
        {locations.map((location) => (
          <li key={location.userId} className="location-detail-item">
            <strong>{location.username}</strong>: 
            {location.timestamp} - 
            {location.coordinates.lat.toFixed(4)}, {location.coordinates.lon.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default AdminLocationDashboard;