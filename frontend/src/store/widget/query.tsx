// libraries
import gql from 'graphql-tag'

export const GetWidget = gql`
  query GetWidget($id: Int!) {
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

export const GetWidgets = gql`
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
  }
`

export const GetWidgetsOverview = gql`
  query GetWidgetsOverview {
    getWidgets {
      id
      title
      type
      position
    }
  }
`
