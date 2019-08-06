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

interface Props {
  setting: Setting
  updateLocalStorage: (localStorage: LocalStorage) => void
}

const UserSettingDelete = (props: Props): JSX.Element => {
  const { setting, updateLocalStorage } = props
  return (
    <Mutation
      mutation={DeleteUserSetting}
      variables={{ settingId: setting.id }}
      onCompleted={(): void =>
        updateLocalStorage({
          [setting.type]: false,
        })
      }
    >
      {(perfomMutation: () => void): JSX.Element => (
        <Checkbox
          id={setting.type}
          label={props.setting.title}
          name={setting.title}
          onChange={perfomMutation}
          tabIndex={1}
          value={true}
        />
      )}
    </Mutation>
  )
}

export default UserSettingDelete
