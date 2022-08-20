import React, { useState, useEffect } from 'react';
import '../css/Info.css';

import Weather from './Weather';
import Notes from './Notes';

export default function Info({ theme }) {
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
    <div id={`container-${theme}`}>
      <div className='info'>
        <div className='date-temp'>
          <h2>{date}</h2>
          <h2>{getWeekday(date)}</h2>
          <Weather />
        </div>
        <h1 className='time'>{time}</h1>
        <Notes />
      </div>
    </div>
  );
}
