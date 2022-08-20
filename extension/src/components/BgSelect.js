import React from 'react';

export default function BgSelect({ bgArray, currBg, changeBg, setTheme }) {
  return (
    <div id='bg-select'>
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
    </div>
  );
}
