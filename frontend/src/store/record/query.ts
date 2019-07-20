// libraries
import gql from 'graphql-tag'


// fragments
export const RecordFields = gql`
  fragment RecordFields on Record {
    id
    title
    amount
    description
    createdAt
    category {
      color
      hasUnit
      icon
      id
      title
      type
      unit
    }
  }
`

// queries
export const GetRecords = gql`
  query GetRecords(
    $createdAt: String
    $createdAtFrom: String
    $createdAtTo: String
  ) {
    getRecords(
      createdAt: $createdAt
      createdAtFrom: $createdAtFrom
      createdAtTo: $createdAtTo
    ) {
      id
      title
      amount
      description
      createdAt
      category {
        color
        hasUnit
        icon
        id
        title
        type
        unit
        parent {
          color
          hasUnit
          icon
          id
          title
          type
          unit
        }
      }
    }
  }
`

export const GetRecord = gql`
  query GetRecord($id: ID!) {
    getRecord(id: $id) {
      id
      title
      amount
      description
      createdAt
      category {
        color
        hasUnit
        icon
        id
        title
        type
        unit
      }
    }
  }
`
