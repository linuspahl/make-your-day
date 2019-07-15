// libraries
import gql from 'graphql-tag'

export const CreateWidget = gql`
  mutation CreateWidget(
    $title: String!
    $type: String!
    $value: String
    $position: String!
    $evaluationId: ID
  ) {
    createWidget(
      value: $value
      title: $title
      type: $type
      position: $position
      evaluationId: $evaluationId
    ) {
      id
      title
      position
      type
    }
  }
`

export const UpdateWidget = gql`
  mutation UpdateWidget(
    $id: ID!
    $title: String!
    $type: String!
    $value: String
    $position: String!
  ) {
    updateWidget(
      id: $id
      title: $title
      type: $type
      value: $value
      position: $position
    ) {
      id
      title
      type
      value
      position
    }
  }
`

export const DeleteWidget = gql`
  mutation DeleteWidget($id: ID!) {
    deleteWidget(id: $id)
  }
`
