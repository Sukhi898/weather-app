import React, { useState } from "react";
import styles from "../styles/Weather.module.css";

const WeatherDisplay = ({ weather, forecast }) => {
  const [unit, setUnit] = useState("C");

  if (!weather) {
    return <p>Weather data is unavailable</p>;
  }

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const currentTemp =
    unit === "C" ? weather.main.temp : convertToFahrenheit(weather.main.temp);
  const unitSymbol = unit === "C" ? "°C" : "°F";

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  return (
    <div className={styles.weatherCard}>
      <div className={styles.Btntitle}>
        <h2>{weather.name}</h2>

        <i className="ri-toggle-line" onClick={toggleUnit}>
          {unit === "C" ? "°F" : "°C"}
        </i>
      </div>

      <div className={styles.report}>
        <p>
          <i className="ri-temp-hot-fill">Temperature: </i>
          {currentTemp} {unitSymbol}{" "}
        </p>
        <p>
          <i className="ri-water-percent-line">Humidity:</i>
          {weather.main.humidity}%
        </p>
        <p>
          <i className="ri-windy-line">Wind Speed: </i>
          {weather.wind.speed} m/s
        </p>
        <p>
          <i className="ri-foggy-line">Conditions:</i>
          {weather.weather[0].description}
        </p>
      </div>

      <img src={iconUrl} alt={weather.weather[0].description} />

      <h3>Upcoming Forecast</h3>
      <div className={styles.forecastContainer}>
        {forecast.length ? (
          forecast.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const forecastIcon = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
            const dayTemp =
              unit === "C" ? day.temp : convertToFahrenheit(day.temp);

            return (
              <div key={index} className={styles.forecastCard}>
                <h4>{dayName}</h4>
                <p>
                  Temp: {dayTemp} {unitSymbol}
                </p>{" "}
                <p>Conditions: {day.conditions}</p>
                <img src={forecastIcon} alt={day.conditions} />
              </div>
            );
          })
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
