// libraries
import gql from 'graphql-tag'

export const CreateEvaluation = gql`
  mutation CreateEvaluation(
    $title: String!
    $categoryId: Int!
    $type: String!
    $period: String!
    $groupSubcategories: Boolean
  ) {
    createEvaluation(
      title: $title
      categoryId: $categoryId
      type: $type
      period: $period
      groupSubcategories: $groupSubcategories
    ) {
      id
      title
      categoryId
      type
      period
      groupSubcategories
    }
  }
`

export const UpdateEvaluation = gql`
  mutation UpdateEvaluation(
    $id: Int!
    $title: String!
    $categoryId: Int!
    $type: String!
    $period: String!
    $groupSubcategories: Boolean
  ) {
    updateEvaluation(
      id: $id
      title: $title
      categoryId: $categoryId
      type: $type
      period: $period
      groupSubcategories: $groupSubcategories
    ) {
      id
      title
      categoryId
      type
      period
      groupSubcategories
    }
  }
`

export const DeleteEvaluation = gql`
  mutation DeleteEvaluation($id: Int!) {
    deleteEvaluation(id: $id)
  }
`
