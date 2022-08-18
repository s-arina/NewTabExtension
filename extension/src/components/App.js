import React, { useState, useEffect } from 'react';
import '../css/App.css';

import DateTime from './DateTime';

export default function App() {
  const [currBg, setCurrBg] = useState('engawa');

  const changeBg = (name) => {
    setCurrBg(name);
  };

  const bgArray = [
    { id: 1, name: 'engawa' },
    { id: 2, name: 'pond' },
    { id: 3, name: 'streetcorner' },
    { id: 4, name: 'trainstop' },
  ];
  console.log(currBg);
  return (
    <div className='app'>
      <div
        id='bg'
        style={{
          backgroundImage: `url('/bgs/${currBg}.gif')`,
        }}
      ></div>
      <div id='container'>
        <DateTime />
      </div>
      <footer>
        {bgArray?.map((bg) => (
          <span
            key={bg.id}
            className={bg.name}
            onClick={() => changeBg(bg.name)}
          ></span>
        ))}
      </footer>
    </div>
  );
}
