import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';

function ThemeButton({ theme, setTheme }) {
  return (
    // if theme is light, show sun
    // clicking on sun turns theme dark
    // clicking on moon turns theme light

    <div className='icon' data-hover={theme === 'light' ? 'light' : 'dark'}>
      {theme === 'light' ? (
        <LightModeIcon
          style={{
            fill: '#f2f2f2',
            transition: 'all 0.1s',
            fontSize: '19px',
          }}
          onClick={() => setTheme('dark')}
        />
      ) : (
        <Brightness3Icon
          style={{
            fill: '#000',
            transition: 'all 0.1s',
            fontSize: '19px',
            transform: 'rotate(145deg)',
          }}
          onClick={() => setTheme('light')}
        />
      )}
    </div>
  );
}

export default ThemeButton;
