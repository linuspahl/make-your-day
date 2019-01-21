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
    token: String
    role: String!
    nightMode: Boolean
    userSettings: [UserSetting]!
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

  type Setting {
    id: Int!
    title: String!
    type: String!
    defaultValue: String!
  }

  type UserSetting {
    id: Int!
    value: String
    user: User!
    setting: Setting!
  }

  type Mutation {
    loginUser(username: String!, password: String!): User!
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
    createUserSetting(settingId: Int!, value: String): UserSetting!
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
    # Delete
    deleteUserSetting(settingId: Int!): Boolean
  }

  type Query {
    getCategories: [Category]!
    getCategory(id: Int!): Category!
    getSettings: [Setting]!
  }
`
