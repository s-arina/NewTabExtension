import React, { useState } from 'react';
import '../css/Notepad.css';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Notes({ theme }) {
  // save and retrieve notes from local storage & remember if notepad was open or not on refresh
  const notesStorage = localStorage.getItem('notes');
  const notepadState = localStorage.getItem('notepad');

  const [notes, setNotes] = useState(notesStorage);
  // parse the localStorage value, boolean is stored as string
  const [open, setOpen] = useState(JSON.parse(notepadState));

  // chevron/other styling
  const chevronRotate = open ? 'rotate(90deg)' : 'rotate(0)';
  const chevronTheme = theme === 'light' ? '#f2f2f2' : '#000';
  const placeholder = '         *⁺‧͙˚*･༓ ☾　Write a note... ☽ ༓･*˚‧͙⁺*';

  function onChange(e) {
    localStorage.setItem('notes', e.target.value);
    setNotes(e.target.value);
  }

  function notepad() {
    localStorage.setItem('notepad', !open);
    setOpen(!open);
  }

  return (
    <div id='notepad'>
      <div className='notes' onClick={() => notepad()}>
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
            placeholder={placeholder}
          ></textarea>
        </div>
      )}
    </div>
  );
}
