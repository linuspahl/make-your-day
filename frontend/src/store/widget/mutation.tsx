// libraries
import gql from 'graphql-tag'

export const CreateWidget = gql`
  mutation CreateWidget($title: String!, $type: String!, $value: String, $position: String!, $evaluationId: Int) {
    createWidget(value: $value, title: $title, type: $type, position: $position, evaluationId: $evaluationId) {
      id
      title
      position
    }
  }
`

export const UpdateWidget = gql`
  mutation UpdateWidget($id: Int!, $title: String!, $type: String!, $value: String, $position: String!) {
    updateWidget(id: $id, title: $title, type: $type, value: $value, position: $position) {
      id
      title
      type
      value
      position
    }
  }
`

export const DeleteWidget = gql`
  mutation DeleteWidget($id: Int!) {
    deleteWidget(id: $id)
  }
`
