import React, { useState } from "react";
import styles from "../styles/Search.module.css";

const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className={styles.SearchBox}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
