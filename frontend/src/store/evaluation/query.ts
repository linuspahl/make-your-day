// libraries
import gql from 'graphql-tag'

// queries
export const GetEvaluationsForList = gql`
  query GetEvaluationsForList {
    getEvaluations {
      id
      title
    }
  }
`

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
