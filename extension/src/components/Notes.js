import React from 'react';
import '../css/Notes.css';

export default function Notes() {
  return (
    <div id='notes'>
      <h2>Notes</h2>
      <textarea className='notepad' placeholder='Write a note...'></textarea>
    </div>
  );
}
