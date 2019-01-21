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
    color: String
    hasDescription: Boolean
    hasTitle: Boolean
    hasUnit: Boolean
    icon: String
    id: Int!
    parentCategory: Category
    title: String
    type: String!
    unit: String
    user: User!
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
      color: String
      hasDescription: Boolean
      hasTitle: Boolean
      hasUnit: Boolean
      icon: String
      title: String!
      type: String!
      unit: String
    ): Category!
    # Update
    updateCategory(
      color: String
      hasDescription: Boolean
      hasTitle: Boolean
      hasUnit: Boolean
      icon: String
      id: Int!
      title: String
      type: String!
      unit: String
    ): Category!
  }

  type Query {
    getCategories: [Category]!
    getCategory(id: Int!): Category!
  }
`
