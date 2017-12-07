import React, { Component } from 'react';
import gql from 'graphql-tag'; //allows us to write a query
import { graphql } from 'react-apollo';
import { Link } from 'react-router'
import query from '../queries/fetchSongs';

class Songlist extends Component {
  onSongDelete(id){
    this.props.mutate({
      variables: { id: id},
    // option #1
      refetchQueries: [{ query: query }]
    })
    // option #2 - typically used when within the same coponent file
    // .then(() => this.props.data.refetch())
  }

  renderSongs(){
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className='collection-item'>
          <Link to={`/songs/${song.id}`}>
            {song.title}
          </Link>
          <i
            className='material-icons right'
            onClick={() => this.onSongDelete(song.id)}
            >delete</i>
        </li>
      )
    })
  }

  render(){
    // console.log(this.props.data);
    if (this.props.data.loading) {
      return(
        <div> Loading </div>
      )
    }
    return(
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className='btn-floating btn-large blue right'
        >
          <i className='material-icons'>add</i>
        </Link>
      </div>

    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id
    }
  }
`
export default graphql(mutation)(
  graphql(query)(Songlist)
)
