import React from 'react';
import NoteItem from './NoteItem';

const NoteList = props => {
  console.log("in note list", props);
  return (
    <ul>
      {props.notes.map(note => {
        return (
          <NoteItem
            note={note}
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            shortenedNote={
              note.body.length > 25 ? note.body.slice(0, 25) + "..." : note.body
            }
            clickedNote={() => props.clickedNote(note.id)}
          />
        );
      })}
    </ul>
  );
};

export default NoteList;
