// libraries
import * as React from 'react'
import { Mutation, MutationOptions } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { CreateUserSetting } from 'store/userSetting/mutation'
import { Setting } from 'store/setting/type';
// interface
import { LocalStorage } from 'types/types'
import { userSetting } from 'store/userSetting/fixtures';

interface Props {
  setting: Setting
  updateLocalStorage: (localStorage: LocalStorage) => void
}

const UserSettingCreate = (props: Props) => (
  <Mutation
    mutation={CreateUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={data =>
      props.updateLocalStorage({
        [props.setting.type]: data.createUserSetting.value,
      })
    }
  >
    {perfomMutation => <Checkbox value={false} onChange={(event: MutationOptions<any, { settingId: number; }>) => perfomMutation(event)} tabIndex={1} name={userSetting.setting.title}/>}
  </Mutation>
)

export default UserSettingCreate
