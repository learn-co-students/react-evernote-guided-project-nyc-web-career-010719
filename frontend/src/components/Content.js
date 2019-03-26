import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {

  state = {
    selectedNote: this.props.selectedNote,
    editNote: false
  }

  handleEditClick = () => {
    this.setState({
      editNote: true
    })
  }

  changeEditNote = () => {
    this.setState({
      editNote: false
    })
  }

  renderContent = () => {

    if (this.state.editNote === true) {
      return <NoteEditor
        note={this.props.clickedNote}
        handleEditSubmit={this.props.handleEditsubmit}
        handleEditClick={this.handleEditClick}
         />;
     } else if (this.props.clickedNote.id) {
      return <NoteViewer
          note={this.props.clickedNote}
          editClick={this.handleEditClick}
         />;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div key={this.props.clickedNote.id} className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
