// libraries
import gql from 'graphql-tag'

// Alias for CreateUserSession
export const LoginUser = gql`
  mutation LoginUser($username: String!, $password: String!, $device: String!) {
    loginUser(username: $username, password: $password, device: $device) {
      id
      token
      role
      userSettings {
        value
        setting {
          type
        }
      }
      userSession {
        id
        token
        expiresAt
        createdAt
      }
    }
  }
`

export const DeleteUserSession = gql`
  mutation DeleteUserSession($id: ID!) {
    deleteUserSession(id: $id)
  }
`
