// libraries
import React, { useContext } from 'react'
import { Mutation } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { CreateUserSetting } from 'store/userSetting/mutation'
import { Setting } from 'store/setting/type'
// interface
import { UserSetting } from 'store/userSetting/type'

interface Props {
  setting: Setting
}

const UserSettingCreate = ({ setting }: Props): JSX.Element => {
  const { updateLocalStorage } = useContext(AppContext)
  return (
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
}

export default UserSettingCreate
