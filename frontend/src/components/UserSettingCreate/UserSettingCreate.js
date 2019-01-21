// libraries
import React from 'react'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { Mutation } from 'react-apollo'
import { CreateUserSetting } from 'store/userSetting/mutation.gql'

export default props => (
  <Mutation
    mutation={CreateUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={data =>
      props.updateLocalStorage({
        [props.setting.type]: JSON.parse(data.createUserSetting.value),
      })
    }
  >
    {(perfomMutation, { data }) => (
      <Checkbox checked={false} onChange={perfomMutation} />
    )}
  </Mutation>
)
