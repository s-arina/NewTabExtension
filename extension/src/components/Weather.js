import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../imgs/loader.gif';

export default function Weather() {
  // cache coordinates to use until location is changed
  // if coordinates are the same, geolocation will not run, saves rendering time
  const getLat = window.localStorage.getItem('lat');
  const getLong = window.localStorage.getItem('long');

  const apiKey = process.env.REACT_APP_OPENWEATHER;
  const url = 'https://api.openweathermap.org/data/2.5/';

  const [lat, setLat] = useState(getLat ? getLat : '');
  const [long, setLong] = useState(getLong ? getLong : '');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
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
        `${url}weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
      );
      setLoading(false);
      setWeatherData(data);
    } catch (err) {
      console.log('Error: Could not retrieve weather data. Please try again.');
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
      ) : weatherData.main ? (
        <h2 onClick={() => toggleUnit()}>
          {unit
            ? Math.round(weatherData.main.feels_like)
            : Math.round((5 / 9) * (weatherData.main.feels_like - 32))}
          &deg;{unit ? 'F' : 'C'}
        </h2>
      ) : null}
    </>
  );
}
