import React from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

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
}) {
  // icon styling
  const iconTheme = theme === 'light' ? '#f2f2f2' : '#000';

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

    // bg won't update until refresh
    // force a bg image change on the spot in a way that won't need to wait for state to update
    document.getElementById(
      'bg'
    ).style.backgroundImage = `url("${customInput}")`;

    setCustomInputPopup(false);
  };

  // custom bg input element
  const CustomBgInput = (
    <form className='custom-input' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Paste image URL'
        onChange={onChange}
        value={customInput}
      ></input>
      <ArrowCircleRightRoundedIcon
        style={{
          fill: iconTheme,
          transition: 'all 0.1s',
          fontSize: '25px',
          position: 'absolute',
          right: '0',
        }}
        onClick={onSubmit}
      />
    </form>
  );

  return (
    <div id={`bg-select-${theme}`}>
      {/* custom background input */}
      {customInputPopup ? CustomBgInput : null}

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
            setTheme(customBg.theme);
          }}
        ></span>
      )}

      {/* info icon on presets, edit icon for custom */}
      <div
        className='icon'
        data-hover={currBg === 'custom' ? 'edit' : 'artist'}
      >
        {currBg !== 'custom' ? (
          <InfoOutlinedIcon
            style={{
              fill: iconTheme,
              transition: 'all 0.1s',
              fontSize: '19px',
            }}
            onClick={toArtist}
          />
        ) : (
          <BrushIcon
            style={{
              fill: iconTheme,
              transition: 'all 0.1s',
              fontSize: '19px',
            }}
            onClick={() => setCustomInputPopup(!customInputPopup)}
          />
        )}
      </div>
    </div>
  );
}
