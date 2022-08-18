import React, { useState } from 'react';
import engawa from '../bgs/engawa.gif';
import pond from '../bgs/pond.gif';
import streetcorner from '../bgs/streetcorner.gif';
import trainstop from '../bgs/trainstop.gif';
import '../css/App.css';

import DateTime from './DateTime';

export default function App() {
  const random = ['engawa', 'pond', 'streetcorner', 'trainstop'];
  const randomBg = Math.floor(Math.random() * random.length);

  const [currBg, setCurrBg] = useState(random[randomBg]);

  // console.log(currBg);

  const changeBg = (name) => {
    setCurrBg(name);
  };

  const bgArray = [
    { id: 1, name: 'engawa', img: engawa },
    { id: 2, name: 'pond', img: pond },
    { id: 3, name: 'streetcorner', img: streetcorner },
    { id: 4, name: 'trainstop', img: trainstop },
  ];

  return (
    <div className='app'>
      <div
        id='bg'
        style={{
          backgroundImage: `url(${
            currBg === 'engawa'
              ? engawa
              : currBg === 'pond'
              ? pond
              : currBg === 'streetcorner'
              ? streetcorner
              : currBg === 'trainstop'
              ? trainstop
              : ''
          })`,
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
