import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather(props) {
  const apiKey = process.env.REACT_APP_WEATHER_API;
  const url = 'https://api.weatherapi.com/v1/';

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // api call runs on refresh
    setLoading(true);
    fetchWeatherData();
  }, [lat, long]);

  // api call for forecast
  const fetchWeatherData = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLong(longitude);
    });
    try {
      const { data } = await axios.get(
        `${url}forecast.json?key=${apiKey}&q=${lat},${long}&aqi=no`
      );
      setLoading(false);
      setWeatherData(data);
    } catch (err) {
      setError('Error: Could not retrieve data. Please try again.');
    }
  };

  return (
    <div id='weather'>
      {weatherData.current && <h3>{weatherData.current.feelslike_f}</h3>}
      {weatherData.location && <h3>{weatherData.location.name}</h3>}
    </div>
  );
}

export default Weather;
