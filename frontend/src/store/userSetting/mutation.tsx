// libraries
import gql from 'graphql-tag'

export const CreateUserSetting = gql`
  mutation CreateUserSetting($settingId: Int!) {
    createUserSetting(settingId: $settingId) {
      id
      value
    }
  }
`

export const DeleteUserSetting = gql`
  mutation DeleteUserSetting($settingId: Int!) {
    deleteUserSetting(settingId: $settingId)
  }
`
