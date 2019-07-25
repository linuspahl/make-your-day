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
    $value: String
    $position: String!
    $evaluationId: ID
  ) {
    updateWidget(
      id: $id
      title: $title
      value: $value
      position: $position
      evaluationId: $evaluationId
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
