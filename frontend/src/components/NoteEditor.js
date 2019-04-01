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

  handleSubmit = (event) => {
    console.log(event)
    event.preventDefault()
    this.props.handleEditSubmit(this.state.postTitle, this.state.postBody)
  }
  render() {
    return (
      <form className="note-editor" onSubmit={(event) => this.handleSubmit(event)}>
        <input type="text" name="title" placeholder="title"
          defaultValue={this.props.note.title}
          onChange={this.handleEditChange}
          />
        <textarea name="body" defaultValue={this.props.note.body} onChange={this.handleEditChange}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={() => this.props.cancelEdit()}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
