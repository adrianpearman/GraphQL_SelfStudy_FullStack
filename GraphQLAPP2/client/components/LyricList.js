import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  onLike(id, likes){
      this.props.mutate({
        variables: {id: id},
        // optimistic update is used for speeding up the UI for the user
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id: id,
            __typename: 'LyricType',
            likes: likes + 1
          }
        }
      })
  }

  renderLyricList(){
    // console.log(this.props);
    return this.props.lyrics.map((lyric) => {
      return(
        <li className='collection-item' key={lyric.id}>
          {lyric.content}
          <div className='vote-box'>
            <i className='material-icons'
            onClick={() => this.onLike(lyric.id, lyric.likes)}
            >thumb_up</i>
            {lyric.likes}
          </div>
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

const mutation = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
export default graphql(mutation)(LyricList)
