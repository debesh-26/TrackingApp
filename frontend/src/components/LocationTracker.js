import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { trackLocation } from "../api";

const LocationMapTracker = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const sendLocation = async () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported");
        return;
      }

      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        console.log(pos);

        const newPosition = [pos.coords.latitude, pos.coords.longitude];

        setPosition(newPosition);
        console.log(position);

        await trackLocation({
          lat: newPosition[0],
          lon: newPosition[1],
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    sendLocation();
    const intervalId = setInterval(sendLocation, 4000);

    return () => clearInterval(intervalId);
  }, []);

  if (!position) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100">
        <p className="text-gray-600">Loading location...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden shadow-lg">
      <Map height={600} center={position} zoom={15} animate={true}>
        <Marker
          width={50}
          anchor={position}
          color="#2563eb"
          onClick={() => {
            alert(
              `Latitude: ${position[0].toFixed(
                4
              )}\nLongitude: ${position[1].toFixed(4)}`
            );
          }}
        />
      </Map>
    </div>
  );
};

export default LocationMapTracker;
