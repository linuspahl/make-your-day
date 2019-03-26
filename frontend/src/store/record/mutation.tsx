// libraries
import gql from 'graphql-tag'

export const CreateRecord = gql`
  mutation CreateRecord(
    $amount: String,
    $categoryId: Int!,
    $description: String,
    $title: String,
    $createdAt: String,
    ) {
    createRecord(
      amount: $amount,
      categoryId: $categoryId,
      description: $description,
      title: $title
      createdAt: $createdAt,
    ) {
      id
      title
      amount
      description
      createdAt
      category {
        id
        icon
        color
        title
        type
        hasUnit
        unit
      }
    }
  }
`

export const UpdateRecord = gql`
  mutation UpdateRecord(
    $id: Int!,
    $amount: String,
    $categoryId: Int!,
    $description: String,
    $title: String
  ) {
    updateRecord(
      id: $id,
      amount: $amount,
      categoryId: $categoryId,
      description: $description,
      title: $title
    ) {
      id
      title
      amount
      description
      createdAt
      category {
        id
        icon
        color
        type
        hasUnit
        unit
      }
    }
  }
`

export const DeleteRecord = gql`
  mutation DeleteRecord($id: Int!) {
    deleteRecord(id: $id)
  }
`