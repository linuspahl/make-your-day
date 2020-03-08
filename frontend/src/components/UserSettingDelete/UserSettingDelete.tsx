// libraries
import { Mutation } from 'react-apollo'
import React, { useContext } from 'react'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { DeleteUserSetting } from 'store/userSetting/mutation'
// interfaces
import { Setting } from 'store/setting/type'

interface Props {
  setting: Setting
}

const UserSettingDelete = ({ setting }: Props): JSX.Element => {
  const { updateLocalStorage } = useContext(AppContext)
  return (
    <Mutation
      mutation={DeleteUserSetting}
      variables={{ settingId: setting.id }}
      onCompleted={(): void => updateLocalStorage({ [setting.type]: 'false' })}
    >
      {(perfomMutation: () => void): JSX.Element => (
        <Checkbox
          id={setting.type}
          label={setting.title}
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
