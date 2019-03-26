import React, { Component } from 'react';

class NoteEditor extends Component {
  state = {
    postTitle: this.props.note.title,
    postBody: this.props.note.body
  }

  handleEditChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }
  render() {
    return (
      <form className="note-editor" >
        <input type="text" name="title" placeholder="title" value={this.props.note.title}/>
        <textarea name="body" value={this.props.note.body}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
