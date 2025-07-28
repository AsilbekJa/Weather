import React, { useState } from "react";
import "./App.css";

const API_KEY = "b0d9b31718ed10da31885e0b876f6499";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError("Shahar topilmadi.");
      }
    } catch {
      setWeather(null);
      setError("Xatolik yuz berdi.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Ob-havo</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        placeholder="Shahar nomini kiriting"
      />

      <button onClick={fetchWeather}>Qidirish</button>

      {loading && <p>Yuklanmoqda...</p>}
      {error && <p>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Ob-havo"
          />
          <p>Harorat: {weather.main.temp}C</p>
          <p>Holati: {weather.weather[0].description}</p>
          <p>Shamol: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
