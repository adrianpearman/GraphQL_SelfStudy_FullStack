import gql from 'graphql-tag'

export default gql`
  query FindSong($id: ID!){
  song(id: $id){
    title
  }
}
`
