import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import engawa from '../imgs/engawa.gif';
import pond from '../imgs/pond.gif';
import street from '../imgs/street.gif';
import train from '../imgs/train.gif';
import '../css/Bg.css';

import Info from './Info';
import BgSelect from './BgSelect';

export default function Bg() {
  const twt = 'https://twitter.com/';
  const bgArray = [
    {
      id: 1,
      name: 'engawa',
      img: engawa,
      artist: `${twt}lennsan_`,
      theme: 'light',
    },
    {
      id: 2,
      name: 'pond',
      img: pond,
      artist: `${twt}lennsan_`,
      theme: 'dark',
    },
    {
      id: 3,
      name: 'street',
      img: street,
      artist: `${twt}waneella_`,
      theme: 'light',
    },
    {
      id: 4,
      name: 'train',
      img: train,
      artist: `${twt}1041uuu`,
      theme: 'dark',
    },
  ];

  // set random bg on load as initial state
  const random = ['engawa', 'pond', 'street', 'train'];
  const randomBg = Math.floor(Math.random() * random.length);
  const [currBg, setCurrBg] = useState(random[randomBg]);

  // set light/dark theme for text
  const [theme, setTheme] = useState(
    currBg.match(/engawa|street/) ? 'light' : 'dark'
  );

  const [bgChanged, setBgChanged] = useState(false);

  const changeBg = (name) => {
    // stop rerendering if the current bg is clicked again
    if (currBg !== name) {
      setCurrBg(name);
      setBgChanged(!bgChanged);
    }
  };

  return (
    <>
      <CSSTransition in={bgChanged} timeout={100} classNames='bg'>
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
      </CSSTransition>
      <Info currBg={currBg} theme={theme} />
      <BgSelect
        bgArray={bgArray}
        currBg={currBg}
        changeBg={changeBg}
        setTheme={setTheme}
        theme={theme}
      />
    </>
  );
}
