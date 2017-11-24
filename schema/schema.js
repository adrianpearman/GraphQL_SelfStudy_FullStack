const graphql = require('graphql')
// const _ = require('lodash')  //we used lodash for the hard code users object
const axios = require('axios')

const{
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt ,
  GraphQLSchema,
  GraphQLList
} = graphql

// const users = [
//   {id: '23', firstName: 'Adrian', age: 26},
//   {id: '39', firstName: 'Kelsey', age: 34}
// ]

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        console.log(parentValue, args);
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
        .then(response => response.data)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args){
        console.log(parentValue, args);
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
        .then(response => response.data)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user:{
      type: UserType,
      args: {id: { type: GraphQLString } },
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/users/${args.id}`)
        // .then((response) => console.log(response.data))
        .then(response => response.data)
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${args.id}`)
        .then(response => response.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})