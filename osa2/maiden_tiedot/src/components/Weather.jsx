import WeatherService from "../services/weather.js";
import { useState, useEffect } from "react";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    WeatherService.getWeather(country.latlng)
      .then((res) => setWeather(res))
      .catch((error) => console.log("failed to fetch weather", error));
  }, [country]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
      />
      <h3>{weather.weather[0].main}</h3>
      <p>
        <em>{weather.weather[0].description}</em>
      </p>
      <p>-</p>
      <p>Temp: {weather.main.temp}°C</p>
      <p>Wind: {weather.wind.speed}m/s</p>
    </div>
  );
};

export default Weather;
