// libraries
import gql from 'graphql-tag'

export const GetEvaluations = gql`
  query GetEvaluations {
    getEvaluations {
      id
      title
    }
  }
`

export const GetEvaluation = gql`
  query GetEvaluation($id: Int!) {
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
