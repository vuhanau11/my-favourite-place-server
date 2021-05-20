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
    image: String
    status: Int
    userId: Int
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
    token: String
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
    image: String
    status: Int
    user: User!
    user_like_place: UserLikePlace!
    createdAt: Date
    updatedAt: Date
  }

  type UserLikePlace {
    id: String
    placeId: String
    userId: String
  }
  
  type Query {
    getAllUsers: [User!]!
    getDetailUser(id: ID!): User
    getPlaceByUser(input: FilterPlaceByUserInput): [Place!]!
    getAllPlaces(input: FilterPlaceInput): [Place!]!
    getDetailPlace(id: ID!): Place!
    myData: User!
  }

  type Mutation {
    createPlace(input: CreatePlaceInput): Place!
    login(input: LoginInput): OAuth!
    userLike(userId: String, placeId: String): UserLikePlace!
  }
`
