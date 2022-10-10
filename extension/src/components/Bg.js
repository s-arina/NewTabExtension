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

  // custom bg from local Storage
  const getCustomBg = window.localStorage.getItem('customBg');

  const customBg = {
    id: 5,
    name: 'custom',
    img: getCustomBg,
    artist: '',
    theme: '',
  };

  // set random bg on load as initial state (not including custom if there's no image)
  let random;
  if (getCustomBg) {
    random = ['engawa', 'pond', 'street', 'train', 'custom'];
  } else {
    random = ['engawa', 'pond', 'street', 'train'];
  }
  const randomBg = Math.floor(Math.random() * random.length);
  const [currBg, setCurrBg] = useState(random[randomBg]);

  // set light/dark theme for text
  const [theme, setTheme] = useState(
    currBg.match(/engawa|street/) ? 'light' : 'dark'
  );

  const [bgChanged, setBgChanged] = useState(false);

  // custom bg states
  // if custom is the first bg on load, input is true, else false
  const [customInputPopup, setCustomInputPopup] = useState(
    currBg === 'custom' ? true : false
  );
  const [customInput, setCustomInput] = useState(
    getCustomBg ? getCustomBg : ''
  );

  const changeBg = (name) => {
    // hide input whenever a bg is selected
    setCustomInputPopup(false);
    // stop rerendering if the current bg is clicked again
    if (currBg !== name && customBg.img) {
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
                : currBg === 'custom'
                ? getCustomBg
                : ''
            })`,
          }}
        ></div>
      </CSSTransition>
      <Info currBg={currBg} theme={theme} />
      <BgSelect
        bgArray={bgArray}
        currBg={currBg}
        customBg={customBg}
        customInputPopup={customInputPopup}
        setCustomInputPopup={setCustomInputPopup}
        changeBg={changeBg}
        customInput={customInput}
        setCustomInput={setCustomInput}
        setTheme={setTheme}
        theme={theme}
      />
    </>
  );
}
