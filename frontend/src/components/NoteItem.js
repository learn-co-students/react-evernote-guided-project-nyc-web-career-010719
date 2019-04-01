import React from 'react';

const NoteItem = (props) => {
  // console.log("in note item", props);
  return (
    <li onClick={props.clickedNote}>
      <h2>{props.title}</h2>
      <p>{props.shortenedNote}</p>
    </li>
  )
}

export default NoteItem;
