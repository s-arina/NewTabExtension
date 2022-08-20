import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../imgs/loader.gif';

export default function Weather() {
  const apiKey = process.env.REACT_APP_WEATHER_API;
  const url = 'https://api.weatherapi.com/v1/';

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState(true);

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

  // toggle between fahrenheit/celcius
  const toggleUnit = () => {
    setUnit(!unit);
  };

  return (
    <>
      {loading ? (
        <img src={loader} alt='loading spinner' className='loading' />
      ) : weatherData.current && weatherData.location ? (
        <h2 onClick={() => toggleUnit()} className='temp'>
          {unit
            ? Math.round(weatherData.current.feelslike_f)
            : Math.round(weatherData.current.feelslike_c)}
          &deg;{unit ? 'F' : 'C'}
        </h2>
      ) : null}
    </>
  );
}
