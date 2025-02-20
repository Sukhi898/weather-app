import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WeatherProvider } from "./context/contextapi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
);
