import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../imgs/loader.gif';

export default function Weather() {
  // cache coordinates to use until location is changed
  // if coordinates are the same, geolocation will not run, saves rendering time
  const getLat = window.localStorage.getItem('lat');
  const getLong = window.localStorage.getItem('long');

  const apiKey = process.env.REACT_APP_WEATHER_API;
  const url = 'https://api.weatherapi.com/v1/';

  const [lat, setLat] = useState(getLat ? getLat : '');
  const [long, setLong] = useState(getLong ? getLong : '');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCoords();
    fetchWeatherData();
  }, [lat, long]);

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;

      if (!getLat && !getLong) {
        window.localStorage.setItem('lat', latitude);
        window.localStorage.setItem('long', longitude);
        setLat(latitude);
        setLong(longitude);
      } else if (
        getLong &&
        getLat &&
        getLat !== latitude &&
        getLong !== longitude
      ) {
        window.localStorage.setItem('lat', latitude);
        window.localStorage.setItem('long', longitude);
      }
    });
  };

  // api call for forecast
  const fetchWeatherData = async () => {
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
        <h2 onClick={() => toggleUnit()}>
          {unit
            ? Math.round(weatherData.current.feelslike_f)
            : Math.round(weatherData.current.feelslike_c)}
          &deg;{unit ? 'F' : 'C'}
        </h2>
      ) : null}
    </>
  );
}
