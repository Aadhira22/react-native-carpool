// RideContext.js
import React, { createContext, useState } from "react";

export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [rides, setRides] = useState([]);
  const [searchParams, setSearchParams] = useState({ pickup: "", dropoff: "" }); // New state for search

  const addRide = (ride) => {
    setRides((prevRides) => [...prevRides, ride]);
  };

  const updateSearchParams = (pickup, dropoff) => {
    setSearchParams({ pickup, dropoff });
  };

  return (
    <RideContext.Provider value={{ rides, addRide, searchParams, updateSearchParams }}>
      {children}
    </RideContext.Provider>
  );
};