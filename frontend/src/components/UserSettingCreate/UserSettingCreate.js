// libraries
import React from 'react'
import { Mutation } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { CreateUserSetting } from 'store/userSetting/mutation.gql'

const UserSettingCreate = props => (
  <Mutation
    mutation={CreateUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={data =>
      props.updateLocalStorage({
        [props.setting.type]: JSON.parse(data.createUserSetting.value),
      })
    }
  >
    {perfomMutation => <Checkbox value={false} onChange={perfomMutation} />}
  </Mutation>
)

export default UserSettingCreate
