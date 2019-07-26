// libraries
import * as React from 'react'
import { Mutation } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { DeleteUserSetting } from 'store/userSetting/mutation'
// interfaces
import { Setting } from 'store/setting/type'
import { LocalStorage } from 'types/types'
import { userSetting } from 'store/userSetting/fixtures'

interface Props {
  setting: Setting
  updateLocalStorage: (localStorage: LocalStorage) => void
}

const UserSettingDelete = (props: Props): JSX.Element => (
  <Mutation
    mutation={DeleteUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={(): void =>
      props.updateLocalStorage({
        [props.setting.type]: false,
      })
    }
  >
    {(perfomMutation: () => void): JSX.Element => (
      <Checkbox
        id={userSetting.setting.type}
        name={userSetting.setting.title}
        onChange={perfomMutation}
        tabIndex={1}
        value={true}
      />
    )}
  </Mutation>
)

export default UserSettingDelete
