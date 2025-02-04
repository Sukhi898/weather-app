import React, { useState, useEffect } from "react";
import Search from "./components/Search.js";
import WeatherDisplay from "./components/Weather.js";
import ErrorHandler from "./components/ErrorHandling.js";
import { WeatherApi, ForecastApi, getCityFromCoordinates } from "./api/api.js";
import styles from "./styles/App.module.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocationWeather = async () => {
    if ("geolocation" in navigator) {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const cityName = await getCityFromCoordinates(
                latitude,
                longitude
              );
              setCity(cityName);
            } catch (error) {
              setError("Unable to get city name from location.");
            }
          },
          (err) => {
            setError("Failed to retrieve location.");
          },
          { timeout: 10000 }
        );
      } catch (error) {
        setError("An error occurred while accessing your location.");
      }
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const fetchWeatherData = async (cityToFetch) => {
    try {
      setLoading(true);
      const currentWeather = await WeatherApi(cityToFetch);
      setWeather(currentWeather);

      const forecastData = await ForecastApi(cityToFetch);
      const forecastByDay = [];

      forecastData.list.forEach((item) => {
        const forecastDate = new Date(item.dt_txt);
        const existingDay = forecastByDay.find(
          (forecast) =>
            forecast.date.getDate() === forecastDate.getDate() &&
            forecast.date.getMonth() === forecastDate.getMonth() &&
            forecast.date.getFullYear() === forecastDate.getFullYear()
        );

        if (!existingDay) {
          forecastByDay.push({
            date: forecastDate,
            temp: item.main.temp,
            conditions: item.weather[0].description,
            icon: item.weather[0].icon,
          });
        }
      });

      const nextFourDaysForecast = forecastByDay.slice(0, 4);
      setForecast(nextFourDaysForecast);
      setLoading(false);
    } catch (err) {
      setError("Unable to find the city.");
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
    setError(null);
  };

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      setCity(lastCity);
    } else {
      getLocationWeather();
    }
  }, []);

  useEffect(() => {
    if (city) {
      localStorage.setItem("lastCity", city);
      fetchWeatherData(city);
    }
  }, [city]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (city) {
        fetchWeatherData(city);
      } else {
        getLocationWeather();
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [city]);

  return (
    <>
      <div className={styles.App}>
        <Search onSearch={handleSearch} />
        {error && <ErrorHandler errorMessage={error} />}{" "}
        {loading ? (
          <p>Loading weather data...</p>
        ) : weather ? (
          <WeatherDisplay weather={weather} forecast={forecast} />
        ) : (
          <p>No weather data available.</p>
        )}
        <span className={styles.developerName}>
          {" "}
          Made by Sukhi <i class="ri-heart-fill"></i>
        </span>
      </div>
    </>
  );
};

export default App;
