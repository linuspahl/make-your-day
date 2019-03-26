// libraries
import * as React from 'react'
import { Mutation } from 'react-apollo'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
// graphql
import { DeleteUserSetting } from 'store/userSetting/mutation'
// interfaces
import { Setting } from 'store/setting/type';
import { LocalStorage } from 'types/types'
import { userSetting } from 'store/userSetting/fixtures';

interface Props {
  setting: Setting
  updateLocalStorage: (localStorage: LocalStorage) => void
}

const UserSettingDelete = (props: Props) => (
  <Mutation
    mutation={DeleteUserSetting}
    variables={{ settingId: props.setting.id }}
    onCompleted={() =>
      props.updateLocalStorage({
        [props.setting.type]: JSON.parse(props.setting.defaultValue),
      })
    }
  >
    {perfomMutation => <Checkbox value={true} onChange={perfomMutation} name={userSetting.setting.title} tabIndex={1} />}
  </Mutation>
)

export default UserSettingDelete
