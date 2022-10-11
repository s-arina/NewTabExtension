import React, { useState, useEffect } from 'react';
import '../css/Info.css';

import Weather from './Weather';
import Notes from './Notes';

export default function Info({ theme, customTheme, currBg }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // problem: getDateTime set to run every minute, but that leads to it not rendering on load
    // need a way to run every minute, but call it immediately at the beginning

    // this solution causes a delay, inaccurate time is shown:
    // getDateTime();
    // setInterval(() => getDateTime(), 1000)

    setInterval(
      (function getDateTime() {
        const currDate = new Date().toLocaleDateString().replace(/\//gi, '-');
        const currTime = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        setDate(currDate);
        setTime(currTime);

        return getDateTime;
      })(),
      60 * 1000
    );
  }, []);

  const getWeekday = (day) => {
    const date = new Date(day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div id={`container-${currBg === 'custom' ? customTheme : theme}`}>
      <div className='info-container'>
        <div className='info'>
          <div className='date-temp'>
            <h2>{date}</h2>
            <h2>{getWeekday(date)}</h2>
            <Weather />
          </div>
          <h1 className='time'>{time}</h1>
        </div>
        <Notes theme={theme} />
      </div>
    </div>
  );
}
