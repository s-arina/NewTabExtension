import React, { useState } from 'react';
import '../css/Notepad.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Notes({ theme }) {
  const [open, setOpen] = useState(false);

  const rotateChevron = open ? 'rotate(90deg)' : 'rotate(0)';
  const chevronTheme = theme === 'light' ? '#f2f2f2' : '#000';

  return (
    <div id='notepad'>
      <div className='notes' onClick={() => setOpen(!open)}>
        <h3>Notes</h3>
        <div className='chevron'>
          <KeyboardArrowRightIcon
            style={{
              transform: rotateChevron,
              fill: chevronTheme,
              transition: 'all 0.2s linear',
            }}
          />
        </div>
      </div>

      {open && (
        <textarea
          className='note-area'
          placeholder='Write a note...'
        ></textarea>
      )}
    </div>
  );
}
