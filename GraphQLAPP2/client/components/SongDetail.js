import React, { Component} from 'react';
import { graphql } from 'react-apollo';
import getSong from '../queries/getSong';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component{
  render() {
    const { song } = this.props.data;
    if (!song) {
      // css loadinfg spinners can go here
      return <div>Loading...</div>
    }

    return(
      <div>
        <Link to = '/'>
          Back
        </Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id}/>
      </div>
    )
  }
}

export default graphql(getSong, {
  // due to the information is being loaded as opposed to a change in state
  // we have to pass this object where the variable are defined
  options: (props) => {
    return {
      variables: {id: props.params.id}
    }
  }
})(SongDetail)
