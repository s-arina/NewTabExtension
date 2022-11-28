import React from 'react';
import { MdWbSunny as LightMode } from 'react-icons/md';
import { MdOutlineNightlightRound as DarkMode } from 'react-icons/md';

function ThemeButton({ customTheme, setCustomTheme }) {
  return (
    <div
      className='icon'
      data-hover={customTheme === 'light' ? 'light' : 'dark'}
    >
      {customTheme === 'light' ? (
        <LightMode
          style={{
            fill: '#f2f2f2',
            transition: 'all 0.1s',
            fontSize: '20px',
          }}
          onClick={() => {
            setCustomTheme('dark');
            window.localStorage.setItem('customTheme', 'dark');
          }}
        />
      ) : (
        <DarkMode
          style={{
            fill: '#000',
            transition: 'all 0.1s',
            fontSize: '20px',
            transform: 'rotate(-30deg)',
          }}
          onClick={() => {
            setCustomTheme('light');
            window.localStorage.setItem('customTheme', 'light');
          }}
        />
      )}
    </div>
  );
}

export default ThemeButton;
