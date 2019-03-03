// libraries
import React from 'react'
import { Mutation } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { DeleteUserSetting } from 'store/userSetting/mutation.gql'

const UserSettingDelete = props => (
  <Mutation
    mutation={DeleteUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={() =>
      props.updateLocalStorage({
        [props.setting.type]: JSON.parse(props.setting.defaultValue),
      })
    }
  >
    {perfomMutation => <Checkbox value={true} onChange={perfomMutation} />}
  </Mutation>
)

export default UserSettingDelete
