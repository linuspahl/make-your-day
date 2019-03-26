// libraries
import gql from 'graphql-tag'

export const GetRecords = gql`
  query GetRecords($createdAt: String, $createdAtFrom: String, $createdAtTo: String) {
    getRecords(createdAt: $createdAt, createdAtFrom: $createdAtFrom, createdAtTo: $createdAtTo) {
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
  query GetRecord($id: Int!) {
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
