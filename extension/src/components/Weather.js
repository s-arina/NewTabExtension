import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../imgs/loader.gif';
import { MdReplay as Retry } from 'react-icons/md';
import { IconContext } from 'react-icons';

export default function Weather({ theme }) {
  // cache coordinates to use until location is changed
  // if coordinates are the same, geolocation will not run, saves rendering time
  const getLat = window.localStorage.getItem('lat');
  const getLong = window.localStorage.getItem('long');

  const key = process.env.REACT_APP_OPENWEATHER;
  const url = 'https://api.openweathermap.org/data/2.5/';

  const [lat, setLat] = useState(getLat || '');
  const [long, setLong] = useState(getLong || '');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unit, setUnit] = useState(true);

  const RetryIconTheme = theme === 'light' ? '#f2f2f2' : '#000';

  useEffect(() => {
    getCoords();
    fetchWeatherData();
  }, [lat, long]);

  // user position
  const getCoords = () => {
    setLoading(true);
    if (navigator.geolocation) {
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
    } else {
      setError(true);
      console.log('Geolocation is not supported in this browser.');
    }
  };

  // api call for forecast
  const fetchWeatherData = async () => {
    try {
      const { data } = await axios.get(
        `${url}weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`
      );
      setWeatherData(data);
    } catch (err) {
      setError(true);
      console.log('Error: Could not retrieve weather data. Please try again.');
    } finally {
      setLoading(false);
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
      ) : (
        error && (
          <IconContext.Provider value={{ color: RetryIconTheme, size: '20px' }}>
            <Retry
              onClick={() => {
                getCoords();
                fetchWeatherData();
              }}
            />
          </IconContext.Provider>
        )
      )}
    </>
  );
}
