const express = require('express')
// by convention, we call express GraphQL with capital QL
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()
const PORT = 4000

// app.use causes expressGraphQL to run as middleware
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log('Listening on: '+PORT);
})
