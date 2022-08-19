import React, { useState } from 'react';
import engawa from '../bgs/engawa.gif';
import pond from '../bgs/pond.gif';
import street from '../bgs/street.gif';
import train from '../bgs/train.gif';
import '../css/App.css';

import DateTime from './DateTime';
import Weather from './Weather';

export default function App() {
  const bgArray = [
    { id: 1, name: 'engawa', img: engawa, theme: 'light' },
    { id: 2, name: 'pond', img: pond, theme: 'dark' },
    { id: 3, name: 'street', img: street, theme: 'light' },
    { id: 4, name: 'train', img: train, theme: 'dark' },
  ];

  // set random bg on load as initial state
  const random = ['engawa', 'pond', 'street', 'train'];
  const randomBg = Math.floor(Math.random() * random.length);
  const [currBg, setCurrBg] = useState(random[randomBg]);

  // set light/dark theme for text
  const [theme, setTheme] = useState(
    currBg === 'engawa' || currBg === 'street' ? 'light' : 'dark'
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
              : currBg === 'street'
              ? street
              : currBg === 'train'
              ? train
              : ''
          })`,
        }}
      ></div>
      <div id='container'>
        <DateTime currBg={currBg} theme={theme} />
        <Weather />
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
