// Graphql type definitions
// Gets included in the apollo server setup
//
// Link to the docs https://graphql.org/learn/schema/

import { gql } from 'apollo-server-express'

export default gql`
  # model representations
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Login {
    id: ID!
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
    id: ID!
    parentId: ID
    parent: Category
    title: String
    type: String!
    unit: String
    user: User!
    subcategories: [Category]!
  }

  type Record {
    amount: Float
    category: Category!
    createdAt: String!
    description: String
    id: ID!
    title: String
    user: User!
  }

  type Evaluation {
    id: ID!
    title: String!
    user: User!
    categoryId: ID!
    category: Category!
    groupSubcategories: Boolean!
    type: String!
    period: String!
    result: EvaluationResult!
  }

  type EvaluationResult {
    labels: [String]
    datasets: [EvaluationResultDataset]
  }

  type EvaluationResultDataset {
    label: String!
    data: [Int]!
    backgroundColor: String!
  }

  type Setting {
    id: ID!
    title: String!
    type: String!
    defaultValue: String!
  }

  type UserSetting {
    id: ID!
    value: String
    user: User!
    setting: Setting!
  }

  type UserSession {
    id: ID!
    device: String!
    expiresAt: String!
    createdAt: String!
  }

  type UserSessionCreate {
    id: ID!
    device: String!
    expiresAt: String!
    createdAt: String!
    token: String!
  }

  type Widget {
    id: ID!
    evaluation: Evaluation
    evaluationId: ID
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
      categoryId: ID!
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
    createSubcategory(title: String!, parentId: ID!): Category!
    createRecord(
      createdAt: String
      title: String
      description: String
      amount: Float
      categoryId: ID!
    ): Record!
    createUserSetting(settingId: ID!, value: String): UserSetting!
    createWidget(
      title: String!
      type: String!
      value: String
      evaluationId: ID
      position: String!
    ): Widget!
    # Update
    updateEvaluation(
      id: ID!
      title: String!
      categoryId: ID!
      groupSubcategories: Boolean
      type: String!
      period: String
    ): Evaluation
    updateCategory(
      color: String
      hasDescription: Boolean
      hasTitle: Boolean
      icon: String
      id: ID!
      title: String
      unit: String
    ): Category!
    updateWidget(
      id: ID!
      title: String!
      type: String!
      value: String
      position: String!
    ): Widget!
    updateRecord(
      id: ID!
      title: String
      description: String
      amount: Float
      categoryId: ID!
    ): Record!
    # Delete
    deleteUserSetting(settingId: ID!): Boolean
    deleteUserSession(id: ID!): Boolean
    deleteCategory(id: ID!): Boolean
    deleteWidget(id: ID!): Boolean
    deleteRecord(id: ID!): Boolean
    deleteEvaluation(id: ID!): Boolean
  }

  type Query {
    getCategories(parentsOnly: Boolean): [Category]!
    getCategory(id: ID!): Category!
    getEvaluations: [Evaluation]!
    getEvaluation(id: ID!): Evaluation!
    getRecord(id: ID!): Record!
    getRecords(
      createdAt: String
      createdAtFrom: String
      createdAtTo: String
    ): [Record]!
    getSettings: [Setting]!
    getUserSessions: [UserSession]!
    getWidget(id: ID!): Widget!
    getWidgets: [Widget]!
  }
`
