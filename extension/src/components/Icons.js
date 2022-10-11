import React from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Icons({
  currBg,
  theme,
  bgArray,
  setCustomInputPopup,
  customInputPopup,
}) {
  // icon styling
  const bgSelectIconTheme = theme === 'light' ? '#f2f2f2' : '#000';

  // loop through array & object to get the artist of the current background
  const bgArtist = bgArray.filter(function (el) {
    return el.name === currBg;
  });

  // link to artist social media
  const toArtist = () => {
    window.open(bgArtist[0].artist, '_blank', 'noopener, noreferrer');
  };

  return (
    <div className='icon' data-hover={currBg === 'custom' ? 'edit' : 'artist'}>
      {currBg !== 'custom' ? (
        <InfoOutlinedIcon
          style={{
            fill: bgSelectIconTheme,
            transition: 'all 0.1s',
            fontSize: '19px',
          }}
          onClick={toArtist}
        />
      ) : (
        <BrushIcon
          style={{
            fill: bgSelectIconTheme,
            transition: 'all 0.1s',
            fontSize: '19px',
          }}
          onClick={() => setCustomInputPopup(!customInputPopup)}
        />
      )}
    </div>
  );
}
