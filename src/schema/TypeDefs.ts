const { gql } = require('apollo-server-express')

export const typeDefs = gql`
  scalar Date

  input LoginInput {
    email: String!
    firstName: String
    lastName: String
    avatar: String
  }

  input CreatePlaceInput {
    name: String!
    description: String
    longitude: Float!
    latitude: Float!
    status: Int
    userId: Int!
  }

  input FilterPlaceInput {
    name: String
    page: Int
    pageSize: Int
  }

  input FilterPlaceByUserInput {
    userId: Int!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type OAuth {
    token: String!
    user: User!
  }

  type Place {
    id: ID!
    name: String
    description: String
    longitude: String
    latitude: String
    status: Int
    userId: Int
    createdAt: Date!
    updatedAt: Date!
  }
  
  type Query {
    getAllUsers: [User!]!
    getDetailUser(id: ID!): User
    getPlaceByUser(input: FilterPlaceByUserInput): [Place!]!
    getAllPlaces(input: FilterPlaceInput): [Place!]!
    getDetailPlace(id: ID!): Place
    me: User!
  }

  type Mutation {
    createPlace(input: CreatePlaceInput): Place!
    login(input: LoginInput): OAuth!
  }
`
