import React, { useState, useEffect } from 'react';
import '../css/Notepad.css';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Notes({ theme }) {
  // save and retrieve notes from local storage
  const notesStorage = localStorage.getItem('notes');
  const [notes, setNotes] = useState(notesStorage);

  const [open, setOpen] = useState(false);

  // chevron styling/animation
  const chevronRotate = open ? 'rotate(90deg)' : 'rotate(0)';
  const chevronTheme = theme === 'light' ? '#f2f2f2' : '#000';

  function onChange(e) {
    localStorage.setItem('notes', e.target.value);
    setNotes(e.target.value);
  }

  return (
    <div id='notepad'>
      <div className='notes' onClick={() => setOpen(!open)}>
        <h3>Notes</h3>
        <div className='chevron'>
          <KeyboardArrowRightIcon
            style={{
              transform: chevronRotate,
              fill: chevronTheme,
              transition: 'all 0.2s linear',
            }}
          />
        </div>
      </div>
      {open && (
        <div className='note-area-container'>
          <textarea
            onChange={onChange}
            value={notes}
            className='note-area'
            placeholder='         *⁺‧͙˚*･༓ ☾　Write a note... ☽ ༓･*˚‧͙⁺*'
          ></textarea>
        </div>
      )}
    </div>
  );
}
