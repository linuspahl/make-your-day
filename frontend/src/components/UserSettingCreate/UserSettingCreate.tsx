// libraries
import * as React from 'react'
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

const UserSettingCreate = (props: Props): JSX.Element => (
  <Mutation
    mutation={CreateUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={(data: { createUserSetting: UserSetting }): void =>
      props.updateLocalStorage({
        [props.setting.type]: JSON.parse(data.createUserSetting.value),
      })
    }
  >
    {(perfomMutation: () => void): JSX.Element => (
      <Checkbox
        id={props.setting.type}
        name={props.setting.title}
        onChange={perfomMutation}
        tabIndex={1}
        value={false}
      />
    )}
  </Mutation>
)

export default UserSettingCreate
