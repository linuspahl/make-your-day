// libraries
import gql from 'graphql-tag'

// fragments
export const GetEvaluations = gql`
  query GetEvaluations {
    getEvaluations {
      id
      title
    }
  }
`

export const EvaluationsFields = gql`
  fragment EvaluationsFields on Evaluation {
    id
    title
  }
`

// queries
export const GetEvaluation = gql`
  query GetEvaluation($id: ID!) {
    getEvaluation(id: $id) {
      id
      title
      categoryId
      groupSubcategories
      type
      period
      category {
        title
      }
      result {
        labels
        datasets {
          label
          data
          backgroundColor
        }
      }
    }
  }
`

export const GetEvaluationUpdate = gql`
  query GetEvaluationPlain($id: ID!) {
    getEvaluation(id: $id) {
      id
      title
      categoryId
      groupSubcategories
      type
      period
    }
  }
`
