import React from 'react';
import { MdOutlineArrowCircleDown as Arrow } from 'react-icons/md';
import { IconContext } from 'react-icons';

function CustomBgInput({ onSubmit, onChange, customInput, submitIconTheme }) {
  return (
    <form className='custom-input' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Paste image URL'
        onChange={onChange}
        value={customInput}
      ></input>
      <IconContext.Provider
        value={{
          color: submitIconTheme,
          size: '26.5px',
        }}
      >
        <Arrow
          style={{
            size: '26.5px',
            position: 'absolute',
            right: '0',
            transform: 'rotate(270deg)',
          }}
          onClick={onSubmit}
        />
      </IconContext.Provider>
    </form>
  );
}

export default CustomBgInput;
