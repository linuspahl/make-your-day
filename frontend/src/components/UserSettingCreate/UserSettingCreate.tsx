// libraries
import React from 'react'
import { Mutation } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { CreateUserSetting } from 'store/userSetting/mutation'
import { Setting } from 'store/setting/type'
// interface
import { LocalStorage } from 'types/types'
import { UserSetting } from 'store/userSetting/type'

interface Props {
  setting: Setting
  updateLocalStorage: (localStorage: LocalStorage) => void
}

const UserSettingCreate = ({
  setting,
  updateLocalStorage,
}: Props): JSX.Element => (
  <Mutation
    mutation={CreateUserSetting}
    variables={{ settingId: setting.id }}
    onCompleted={(data: { createUserSetting: UserSetting }): void =>
      updateLocalStorage({
        [setting.type]: JSON.parse(data.createUserSetting.value),
      })
    }
  >
    {(perfomMutation: () => void): JSX.Element => (
      <Checkbox
        id={setting.type}
        name={setting.type}
        label={setting.title}
        onChange={perfomMutation}
        tabIndex={1}
        value={false}
      />
    )}
  </Mutation>
)

export default UserSettingCreate
