import axios from "axios";

const WeatherApi = async (city) => {
  const apiKey = "23fcccaa93276f8d827db6cfff444859";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const ForecastApi = async (city) => {
  const apiKey = "23fcccaa93276f8d827db6cfff444859";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};

const getCityFromCoordinates = async (latitude, longitude) => {
  const apiKey = "8225e791fced42a298a8add585612ec2";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;
    if (results.length > 0) {
      return results[0].components.city || "City not found";
    }
    throw new Error("Unable to get city name from coordinates.");
  } catch (error) {
    console.error("Error getting city from coordinates:", error);
    throw error;
  }
};

export { WeatherApi, ForecastApi, getCityFromCoordinates };
