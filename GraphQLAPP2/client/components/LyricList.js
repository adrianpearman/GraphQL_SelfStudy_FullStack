import React, { Component } from 'react';

class LyricList extends Component {
  renderLyricList(){
    // console.log(this.props);
    return this.props.lyrics.map((lyric) => {
      return(
        <li className='collection-item' key={lyric.id}>
          {lyric.content}
        </li>
      )
    })
  }

  render(){
    return(
      <ul className='collection'>
        {this.renderLyricList()}
      </ul>
    )
  }
}

export default LyricList
