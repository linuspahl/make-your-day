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
import { userSetting } from 'store/userSetting/fixtures'
// interfaces
import { UserSetting } from 'store/userSetting/type'

interface Props {
  setting: Setting
  updateLocalStorage: (localStorage: LocalStorage) => void
}

const UserSettingCreate = (props: Props): React.ReactElement => (
  <Mutation
    mutation={CreateUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={(data: { createUserSetting: UserSetting }): void =>
      props.updateLocalStorage({
        [props.setting.type]: data.createUserSetting.value,
      })
    }
  >
    {(perfomMutation: () => void): JSX.Element => (
      <Checkbox
        value={false}
        onChange={perfomMutation}
        tabIndex={1}
        name={userSetting.setting.title}
      />
    )}
  </Mutation>
)

export default UserSettingCreate
