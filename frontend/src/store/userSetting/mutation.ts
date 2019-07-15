// libraries
import gql from 'graphql-tag'

export const CreateUserSetting = gql`
  mutation CreateUserSetting($settingId: ID!) {
    createUserSetting(settingId: $settingId) {
      id
      value
    }
  }
`

export const DeleteUserSetting = gql`
  mutation DeleteUserSetting($settingId: ID!) {
    deleteUserSetting(settingId: $settingId)
  }
`
