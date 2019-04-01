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
    })
    console.log(selectedNote)
  } //end selectNote
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
        //makes copy of notes state and passes new note to notes state
      })
    })
  } //end postNote

  handleEditSubmit = (noteTitle, noteBody) => {
    console.log('before fetch');
    fetch(`${notesAPI}/${this.state.selectedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          title: noteTitle,
          body: noteBody,
          user_id: 1
      })
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(editedNote => {
      // this.componentDidMount()
      console.log(editedNote);
      this.setState({
        selectedNote: editedNote
      })
    })
  }

  handleSearch = event => {
    this.setState({
      searchTextInput: event.target.value
  });
};
// function to pass value of text from search bar to set searchTextInput state to the
// value of the search input

  filteredNotes = () => {
    return this.state.notes.filter(
      note => note.title.toLowerCase().includes(
        this.state.searchTextInput.toLowerCase()
      ) || note.body.toLowerCase().includes(
        this.state.searchTextInput.toLowerCase()
      )
    )
  }
  //passing invoked fucntion to NoteList in Sidebar so that whenever text is typed into the Search component, Notelist is being filtered.
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
