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

  type Category {
    id: Int!
    user: User!
    title: String
    icon: String
    color: String
    unit: String
    hasTitle: Boolean
    hasDescription: Boolean
    hasUnit: Boolean
    parentCategory: Int
  }

  # Responses
  type UserLogin {
    token: String!
    id: Int!
    role: String!
  }

  type Mutation {
    loginUser(username: String!, password: String!): UserLogin!
    # Create
    createCategory(
      title: String!
      icon: String
      unit: String
      color: String
      hasTitle: Boolean
      hasDescription: Boolean
      hasUnit: Boolean
    ): Category!
    # Update
    updateCategory(
      id: Int!
      title: String
      icon: String
      color: String
      unit: String
      hasDescription: Boolean
      hasTitle: Boolean
      hasUnit: Boolean
    ): Category!
  }

  type Query {
    getCategories: [Category]!
    getCategory(id: Int!): Category!
  }
`
