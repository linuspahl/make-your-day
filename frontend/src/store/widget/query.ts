// libraries
import gql from 'graphql-tag'

// queries
export const GetWidget = gql`
  query GetWidget($id: ID!) {
    getWidget(id: $id) {
      evaluationId
      id
      position
      title
      type
      value
    }
  }
`

export const GetWidgetsForList = gql`
  query {
    getWidgets {
      id
      title
      type
      position
    }
  }
`

export const GetWidgetsWithEvaluation = gql`
  query GetWidgets {
    getWidgets {
      id
      title
      type
      value
      position
      evaluation {
        id
        title
        categoryId
        groupSubcategories
        type
        period
        category {
          title
          unit
        }
        result {
          labels
          series {
            title
            color
            data {
              title
              color
              value
            }
          }
        }
      }
    }
  }
`
