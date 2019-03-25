import React from 'react';

const NoteList = (props) => {

  return (
    <li onClick={() => props.clickedNote(props.selectedNoteId)}>
      <h2>{props.title}</h2>
      <p>{props.shortenedNote}</p>
    </li>
  )
}

export default NoteList;
