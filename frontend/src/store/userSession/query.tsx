// libraries
import gql from 'graphql-tag'

export const GetUserSessions = gql`
  query GetUserSessions {
    getUserSessions {
      id
      device
      expiresAt
    }
  }
`
