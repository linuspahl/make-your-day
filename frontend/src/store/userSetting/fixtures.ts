// interfaces
import { UserSetting } from 'store/userSetting/type'
// graphql
import {
  CreateUserSetting,
  DeleteUserSetting,
} from 'store/userSetting/mutation'
// fixtures
import { setting } from 'store/setting/fixtures'

export const userSetting: UserSetting = {
  id: '1',
  value: 'true',
  setting,
}

// # Api stubs

// ## createUserSetting
const createUserSettingRequest = {
  request: {
    query: CreateUserSetting,
    variables: { settingId: setting.id },
  },
}
export const createUserSettingSuccess = {
  ...createUserSettingRequest,
  result: {
    data: {
      createUserSetting: userSetting,
    },
  },
}
export const createUserSettingError = {
  ...createUserSettingRequest,
  error: new Error('createUserSetting failed'),
}

// ## deleteUserSetting
const deleteUserSettingRequest = {
  request: {
    query: DeleteUserSetting,
    variables: { settingId: setting.id },
  },
}
export const deleteUserSettingSuccess = {
  ...deleteUserSettingRequest,
  result: {
    data: {
      deleteUserSetting: true,
    },
  },
}
export const deleteUserSettingError = {
  ...deleteUserSettingRequest,
  error: new Error('deleteUserSetting failed'),
}
