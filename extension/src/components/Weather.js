import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../imgs/loader.gif';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

export default function Weather({ theme }) {
  // cache coordinates to use until location is changed
  // if coordinates are the same, geolocation will not run, saves rendering time
  const getLat = window.localStorage.getItem('lat');
  const getLong = window.localStorage.getItem('long');

  // const apiKey = process.env.REACT_APP_OPENWEATHER;
  // const url = 'https://api.openweathermap.org/data/2.5/';

  const [lat, setLat] = useState(getLat || '');
  const [long, setLong] = useState(getLong || '');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unit, setUnit] = useState(true);
  const [key, setKey] = useState('');
  const [url, setUrl] = useState('');

  const RetryIconTheme = theme === 'light' ? '#f2f2f2' : '#000';

  useEffect(() => {
    getKey();
    getCoords();
    fetchWeatherData();
  }, [lat, long, url, key]);

  // api key
  const getKey = async () => {
    try {
      const { data } = await axios.get(
        'https://18lhlaabdi.execute-api.us-east-2.amazonaws.com/default/apiKey'
      );
      setUrl(data.url);
      setKey(data.key);
    } catch (err) {
      setError(true);
      console.log('Error: API call failed.');
    }
  };

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
    if (url && key) {
      try {
        const { data } = await axios.get(
          `${url}weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`
        );
        setWeatherData(data);
      } catch (err) {
        setError(true);
        console.log(
          'Error: Could not retrieve weather data. Please try again.'
        );
      } finally {
        setLoading(false);
      }
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
          <ReplayRoundedIcon
            style={{
              fill: RetryIconTheme,
              fontSize: '19px',
            }}
            onClick={() => {
              getCoords();
              fetchWeatherData();
            }}
          />
        )
      )}
    </>
  );
}
