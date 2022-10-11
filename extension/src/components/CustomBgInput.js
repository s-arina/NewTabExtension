import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function CustomBgInput({ onSubmit, onChange, customInput, submitIconTheme }) {
  return (
    <form className='custom-input' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Paste image URL'
        onChange={onChange}
        value={customInput}
      ></input>
      <ArrowCircleRightOutlinedIcon
        style={{
          fill: submitIconTheme,
          transition: 'all 0.1s',
          fontSize: '25px',
          position: 'absolute',
          right: '0',
        }}
        onClick={onSubmit}
      />
    </form>
  );
}

export default CustomBgInput;
