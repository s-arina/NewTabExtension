import React from 'react';

import BrushIcon from '@mui/icons-material/Brush';

export default function BgSelect({
  bgArray,
  currBg,
  changeBg,
  setTheme,
  theme,
}) {
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

  return (
    <div id={`bg-select-${theme}`}>
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
