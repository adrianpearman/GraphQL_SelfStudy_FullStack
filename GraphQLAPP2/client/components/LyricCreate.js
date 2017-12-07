import React, { Component } from 'react'

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ''}
  }
  render() {
    return(
      <form>
        <label>Add a Lyric</label>
        <input
        value = {this.state.content}
        onChange={event => this.setState({ content: event.target.value})}/>
      </form>
    )
  }
}

export default LyricCreate
