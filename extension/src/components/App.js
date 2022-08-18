import React, { useState } from 'react';
import engawa from '../bgs/engawa.gif';
import pond from '../bgs/pond.gif';
import streetcorner from '../bgs/streetcorner.gif';
import trainstop from '../bgs/trainstop.gif';
import '../css/App.css';

import DateTime from './DateTime';

export default function App() {
  const bgArray = [
    { id: 1, name: 'engawa', img: engawa, theme: 'light' },
    { id: 2, name: 'pond', img: pond, theme: 'dark' },
    { id: 3, name: 'streetcorner', img: streetcorner, theme: 'light' },
    { id: 4, name: 'trainstop', img: trainstop, theme: 'dark' },
  ];

  // set random bg on load as initial state
  const random = ['engawa', 'pond', 'streetcorner', 'trainstop'];
  const randomBg = Math.floor(Math.random() * random.length);
  const [currBg, setCurrBg] = useState(random[randomBg]);

  // set light/dark theme for text
  const [theme, setTheme] = useState(
    currBg === 'engawa' || currBg === 'streetcorner' ? 'light' : 'dark'
  );

  const changeBg = (name) => {
    // stop rerendering if the current bg is clicked again
    if (currBg !== name) {
      setCurrBg(name);
    }
  };

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
        <DateTime currBg={currBg} theme={theme} />
      </div>
      <footer>
        {bgArray?.map((bg) => (
          <span
            key={bg.id}
            className={currBg === bg.name ? 'active' : ''}
            data-hover={bg.name}
            onClick={() => {
              changeBg(bg.name);
              setTheme(bg.theme);
            }}
          ></span>
        ))}
      </footer>
    </div>
  );
}
