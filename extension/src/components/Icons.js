import React from 'react';
import { MdBrush as Brush } from 'react-icons/md';
import { MdInfoOutline as Info } from 'react-icons/md';

export default function Icons({
  currBg,
  theme,
  customTheme,
  bgArray,
  setCustomInputPopup,
  customInputPopup,
}) {
  // icon styling
  const bgSelectIconTheme = theme === 'light' ? '#f2f2f2' : '#000';
  const editIconTheme = customTheme === 'light' ? '#f2f2f2' : '#000';

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
        <Info onClick={toArtist} color={bgSelectIconTheme} size='20px' />
      ) : (
        <Brush
          onClick={() => setCustomInputPopup(!customInputPopup)}
          color={editIconTheme}
          size='20px'
        />
      )}
    </div>
  );
}
