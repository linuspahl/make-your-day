// Graphql type definitions
// Gets included in the apollo server setup
//
// Link to the docs https://graphql.org/learn/schema/

import { gql } from 'apollo-server-express'

export default gql`
  # model representations
  type User {
    id: Int!
    username: String!
    role: String!
    nightMode: Boolean
  }

  # Responses
  type UserLogin {
    token: String!
    id: Int!
    role: String!
  }

  type Mutation {
    loginUser(username: String!, password: String!): UserLogin!
  }
  type Query {
    placeholder: String
  }
`
