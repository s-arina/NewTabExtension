import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';

function ThemeButton({ customTheme, setCustomTheme }) {
  console.log(customTheme);
  return (
    <div
      className='icon'
      data-hover={customTheme === 'light' ? 'light' : 'dark'}
    >
      {customTheme === 'light' ? (
        <LightModeIcon
          style={{
            fill: '#f2f2f2',
            transition: 'all 0.1s',
            fontSize: '19px',
          }}
          onClick={() => {
            setCustomTheme('dark');
            window.localStorage.setItem('customTheme', customTheme);
          }}
        />
      ) : (
        <Brightness3Icon
          style={{
            fill: '#000',
            transition: 'all 0.1s',
            fontSize: '19px',
            transform: 'rotate(145deg)',
          }}
          onClick={() => {
            setCustomTheme('light');
            window.localStorage.setItem('customTheme', customTheme);
          }}
        />
      )}
    </div>
  );
}

export default ThemeButton;
