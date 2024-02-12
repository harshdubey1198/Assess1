import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=0d6d3857527941f3af8152732241102&q=${city}`
        );
        setWeatherData(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('City not found. Please enter a valid city name.');
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      setCity(city.trim());
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Current Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} km/h</p>
          <p>Feels Like: {weatherData.current.feelslike_c}°C</p>
          <p>Visibility: {weatherData.current.vis_km} km</p>
          <p>UV Index: {weatherData.current.uv}</p>
          
          {/* Display more weather details as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
