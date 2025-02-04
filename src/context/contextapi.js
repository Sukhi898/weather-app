import React, { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");

  return (
    <WeatherContext.Provider value={{ weather, setWeather, city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
