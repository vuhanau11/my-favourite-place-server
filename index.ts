require('dotenv').config()

import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './src/schema/TypeDefs'
import { resolvers } from './src/schema/Resolvers'
import jsonwebtoken from 'jsonwebtoken'

const models = require('./models')

const getUser = (token: string) => {
  try {
    if (token) {
      return jsonwebtoken.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}

const server = new ApolloServer({
  typeDefs, resolvers, context: ({ req }) => {
    const token = req.get('authorization') || ''
    const user = getUser(token.replace('Bearer', ''))

    return { user, models }
  }
})

const app: Application = express()
server.applyMiddleware({ app })

let port: number = parseInt(process.env.PORT || '')
if (isNaN(port) || port === 0) {
  port = 8080
}

// The `listen` method launches a web server.
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
