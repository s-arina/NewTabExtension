import React, { useState, useEffect } from 'react';
import '../css/DateTimeWeather.css';
import Weather from './Weather';

export default function DateTimeWeather({ theme }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    getDateTime();
    setInterval(() => getDateTime, 1000);
  }, []);

  const getDateTime = () => {
    const currDate = new Date().toLocaleDateString().replace(/\//gi, '-');
    const currTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    setDate(currDate);
    setTime(currTime);
  };

  const getWeekday = (day) => {
    const date = new Date(day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className={`date-time ${theme}`}>
      <div className='date-temp'>
        <h2 className='date'>{date}</h2>
        <Weather />
      </div>
      <h1 className='time'>{time}</h1>
      <h2 className='day'>{getWeekday(date)}</h2>
    </div>
  );
}
