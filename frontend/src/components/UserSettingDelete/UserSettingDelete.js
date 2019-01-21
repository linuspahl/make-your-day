// libraries
import React from 'react'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { Mutation } from 'react-apollo'
import { DeleteUserSetting } from 'store/userSetting/mutation.gql'

export default props => (
  <Mutation
    mutation={DeleteUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={data =>
      props.updateLocalStorage({
        [props.setting.type]: JSON.parse(props.setting.defaultValue),
      })
    }
  >
    {(perfomMutation, { data }) => (
      <Checkbox checked onChange={perfomMutation} />
    )}
  </Mutation>
)
