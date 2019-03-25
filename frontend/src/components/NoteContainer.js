import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';
// import Content from './Content';

const notesAPI = 'http://localhost:3000/api/v1/notes'

class NoteContainer extends Component {
  state = {
    notes: [],
    selectedNote: {},
    selectedNoteId: null,
    selectedEdit: false,
    filterNotes: [],
    searchTextInput: " "
  }

  componentDidMount() {
    fetch(notesAPI)
    .then(res => res.json()).then(notes => this.setState({
      notes: notes
    })
    )
  } //end componentDidMount

  clickedNote = (id) => {
    let selectedNote = this.state.notes.find(note => note.id === id)
    this.setState({
      selectedNote: selectedNote,
      selectedNoteId: id,
      selectedEdit: false
    })
    console.log(selectedNote)
  } //end selectNote

  //having issue passing this to NoteList
  //TypeError: props.clickedNote is not a function

  findNote = () => {
    return this.state.notes.find(note => note.id === this.state.selectedNoteId)
  }

  handleEditClick = () => {
    this.setState({
      selectedEdit: true
    })
  }

  postNote = () => {
    const newNote = {
      title: "Default Title",
      body: "Placeholder"
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

  handleSearchInput = event => {
  console.log(event.target.value);
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

  renderContent = () => {
    console.log("in render content");
    console.log(this.state.selectedNote);
    if (this.state.edit === true) {
      return <NoteEditor
        findNote={this.findNote}
        />;
    } else if (this.selectedNoteId !== undefined) {
      return <NoteViewer
        findNote={this.findNote}
        />;
    } else {
      return <Instructions />;
    }
  }


  render() {
    // console.log(this.state.notes)
    return (
      <Fragment>
        <Search
          handleSearchInput={this.handleSearchInput}
          />
        <div className='container'>
          <Sidebar
            notes={this.state.notes}
            clickedNote={() => this.clickedNote}
            postNote={this.postNote}
            />
            <div className='master-detail-element detail'>
              {this.renderContent()}
            </div>

        </div>

      </Fragment>
    );
  }
}

export default NoteContainer;
