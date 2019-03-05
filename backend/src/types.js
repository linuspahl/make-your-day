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
  }

  type Login {
    id: Int!
    username: String!
    token: String
    role: String!
    userSettings: [UserSetting]!
    userSession: UserSessionCreate!
  }

  type Category {
    color: String
    hasDescription: Boolean
    hasSubcategories: Boolean
    hasTitle: Boolean
    hasUnit: Boolean
    icon: String
    id: Int!
    parentId: Int
    parent: Category
    title: String
    type: String!
    unit: String
    user: User!
    subcategories: [Category]!
  }

  type Record {
    amount: String
    category: Category!
    createdAt: String!
    description: String
    id: Int!
    title: String
    user: User!
  }

  type Evaluation {
    id: Int!
    title: String!
    user: User!
    categoryId: Int!
    category: Category!
    groupSubcategories: Boolean!
    type: String!
    period: String!
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

  type UserSession {
    id: Int!
    device: String!
    expiresAt: String!
    createdAt: String!
  }

  type UserSessionCreate {
    id: Int!
    device: String!
    expiresAt: String!
    createdAt: String!
    token: String!
  }

  type Widget {
    id: Int!
    user: User!
    title: String!
    type: String!
    value: String
    position: String!
  }

  type Mutation {
    loginUser(username: String!, password: String!, device: String!): Login!
    # Create
    createEvaluation(
      title: String!
      categoryId: Int!
      groupSubcategories: Boolean
      type: String!
      period: String
    ): Evaluation
    createCategory(
      color: String
      hasDescription: Boolean
      hasSubcategories: Boolean
      hasTitle: Boolean
      hasUnit: Boolean
      icon: String
      title: String!
      type: String!
      unit: String
    ): Category!
    createSubcategory(title: String!, parentId: Int!): Category!
    createRecord(
      createdAt: String
      title: String
      description: String
      amount: String
      categoryId: Int!
    ): Record!
    createUserSetting(settingId: Int!, value: String): UserSetting!
    createWidget(
      title: String!
      type: String!
      value: String
      position: String!
    ): Widget!
    # Update
    updateEvaluation(
      id: Int!
      title: String!
      categoryId: Int!
      groupSubcategories: Boolean
      type: String!
      period: String
    ): Evaluation
    updateCategory(
      color: String
      hasDescription: Boolean
      hasTitle: Boolean
      icon: String
      id: Int!
      title: String
      unit: String
    ): Category!
    updateWidget(
      id: Int!
      title: String!
      type: String!
      value: String
      position: String!
    ): Widget!
    updateRecord(
      id: Int!
      title: String
      description: String
      amount: String
      categoryId: Int!
    ): Record!
    # Delete
    deleteUserSetting(settingId: Int!): Boolean
    deleteUserSession(id: Int!): Boolean
    deleteCategory(id: Int!): Boolean
    deleteWidget(id: Int!): Boolean
    deleteRecord(id: Int!): Boolean
    deleteEvaluation(id: Int!): Boolean
  }

  type Query {
    getCategories(parentsOnly: Boolean): [Category]!
    getCategory(id: Int!): Category!
    getEvaluations: [Evaluation]!
    getEvaluation(id: Int!): Evaluation!
    getRecord(id: Int!): Record!
    getRecords(
      createdAt: String
      createdAtFrom: String
      createdAtTo: String
    ): [Record]!
    getSettings: [Setting]!
    getUserSessions: [UserSession]!
    getWidget(id: Int!): Widget!
    getWidgets: [Widget]!
  }
`
