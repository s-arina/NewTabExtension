import React, { useState, useEffect } from 'react';
import '../css/App.css';

function App() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    getDateTime();
    setInterval(() => getDateTime, 1000);
  }, []);

  const getDateTime = () => {
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    setDate(currDate);
    setTime(currTime);
  };

  return (
    <div className='app'>
      <div id='bg'></div>
      <div id='container'>
        <div id='date-time'>
          <h2 id='date'>{date}</h2>
          <h1 id='time'>{time}</h1>
        </div>
      </div>
      <footer>
        <span className='bg1'></span>
        <span className='bg2'></span>
        <span className='bg3'></span>
        <span className='bg4'></span>
      </footer>
      <script src='test.js'></script>
    </div>
  );
}

export default App;
