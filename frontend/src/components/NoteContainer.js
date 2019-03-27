import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
// import NoteEditor from './NoteEditor';
// import NoteViewer from './NoteViewer';
// import Instructions from './Instructions';
import Content from './Content';

const notesAPI = 'http://localhost:3000/api/v1/notes'

class NoteContainer extends Component {
  state = {
    notes: [],
    selectedNote: {},
    selectedEdit: false,
    selectedNoteId: null,
    filterNotes: [],
    searchTextInput: " "
  }

  componentDidMount() {
    fetch(notesAPI)
    .then(res => res.json())
    .then(notes => this.setState({
      notes: notes
    })
    )
  } //end componentDidMount, fetches all notes from DB

  clickedNote = (id) => {
    let selectedNote = this.state.notes.find(note => note.id === id)
    this.setState({
      selectedNote: selectedNote,
      selectedNoteId: id
    })
    console.log(selectedNote)
  } //end selectNote

  findNote = () => {
    return this.state.notes.find(note => note.id === this.state.selectedNoteId)
  }

  //having issue passing this to NoteList
  //TypeError: props.clickedNote is not a function

  handleEditClick = () => {
    this.setState({
      selectedEdit: true
    })
  }

  postNote = () => {
    const newNote = {
      title: "Default Title",
      body: "Placeholder",
      user: {
      id: 1,
      name: "harlangt"
    }
    }
    fetch(notesAPI, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(postNewNote => {
      this.setState({
        notes: [...this.state.notes, postNewNote]
      })
    })
  } //end postNote

  handleEditSubmit = (noteTitle, noteBody) => {
    const noteUpdated = {title: noteTitle, body: noteBody}
    fetch(`${notesAPI}/${this.state.selectedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "applicaton/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(noteUpdated)
    })
    .then(res => res.json())
    .then(editedNote => {
      const notesCopy = [...this.state.notes]
      const findEditedNote = this.findNote()
      const editedIndex = notesCopy.indexOf(findEditedNote)
      notesCopy[editedIndex] = noteUpdated
      this.setState({
        notes: notesCopy
      })
    })
  }

  handleSearch = event => {
  this.setState({
    searchTextInput: event.target.value
  });
};

  filteredNotes = () => {
    return this.state.notes.filter(
      note => note.title.toLowerCase().includes(
        this.state.searchTextInput.toLowerCase()
      ) || note.body.toLowerCase().includes(
        this.state.searchTextInput.toLowerCase()
      )
    )
  }



  render() {
    // console.log(this.state.notes)
    return (
      <Fragment>
        <Search
          handleSearchInput={this.handleSearch}
          />
        <div className='container'>
          <Sidebar
            notes={this.filteredNotes()}
            clickedNote={this.clickedNote}
            postNote={this.postNote}
            />
          <Content
            clickedNote={this.state.selectedNote}
            selectedEdit={this.state.selectedEdit}
            handleEditSubmit={this.handleEditSubmit}
            handleEditClick={this.handleEditClick}
            />
        </div>

      </Fragment>
    );
  }
}

export default NoteContainer;


//State lives in note container. Note container (at least the way application is currently built) has access to all components and containers and seems like the most logical place to pass changes in state through.
