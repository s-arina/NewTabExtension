import React from 'react';
import BrushIcon from '@mui/icons-material/Brush';

export default function BgSelect({
  bgArray,
  currBg,
  changeBg,
  setTheme,
  theme,
  customBg,
  setCustomInputPopup,
  customInputPopup,
  customInput,
  setCustomInput,
  random,
  randomBg,
  setCurrBg,
}) {
  const getCustomBg = window.localStorage.getItem('customBg');

  // icon styling
  const brushTheme = theme === 'light' ? '#f2f2f2' : '#000';

  // loop through array & object to get the artist of the current background
  const bgArtist = bgArray.filter(function (el) {
    return el.name === currBg;
  });

  // link to artist social media
  const toArtist = () => {
    window.open(bgArtist[0].artist, '_blank', 'noopener, noreferrer');
  };

  // input field on change
  const onChange = (e) => {
    e.preventDefault();
    setCustomInput(e.target.value);
  };

  // input field on submit
  const onSubmit = (e) => {
    e.preventDefault();

    // save custom image url in local storage
    window.localStorage.setItem('customBg', customInput);
    // update img property in customBg object to the url
    customBg.img = customInput;

    // IF THERE IS A CUSTOM BG
    if (customBg.img) {
      // bg won't update until refresh
      // force a bg image change on the spot in a way that won't need to wait for state to update
      document.getElementById(
        'bg'
      ).style.backgroundImage = `url("${customInput}")`;
    } else {
      // ELSE IF THE CUSTOM BG IS CLEARED
      // generate a random bg
      const setRandom = random[randomBg];
      setCurrBg(random[randomBg]);
      // get the theme of the random bg in the bgArray and set it again
      bgArray.map((ele) => {
        if (ele.name === setRandom) {
          setTheme(ele.theme);
        }
      });
      setCustomInputPopup(false);
    }
    // if the url is invalid, show black bg with light theme
    setTheme('light');
  };

  const CustomBgInput = (
    <div className='custom-input'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Paste image URL'
          onChange={onChange}
          value={customInput}
        ></input>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  );

  return (
    <div id={`bg-select-${theme}`}>
      {/* default backgrounds */}
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
      {/* custom background */}
      {customBg && (
        <span
          key={customBg.id}
          className={currBg === customBg.name ? 'active' : ''}
          data-hover={customBg.name}
          onClick={() => {
            changeBg(customBg.name);
            setCustomInputPopup(!customInputPopup);
          }}
        ></span>
      )}
      {/* custom background input */}
      {customInputPopup ? CustomBgInput : null}

      <div className='brush-icon' data-hover='artist'>
        <BrushIcon
          style={{
            fill: brushTheme,
            transition: 'all 0.1s',
          }}
          onClick={toArtist}
        />
      </div>
    </div>
  );
}
