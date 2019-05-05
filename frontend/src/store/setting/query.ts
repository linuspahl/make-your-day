// libraries
import gql from 'graphql-tag'

export const GetSettings = gql`
  query GetSettings {
    getSettings {
      id
      title
      type
      defaultValue
    }
  }
`
