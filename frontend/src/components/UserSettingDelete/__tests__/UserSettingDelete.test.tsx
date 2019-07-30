// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingDelete from 'components/UserSettingDelete/UserSettingDelete'
// fixtures
import { setting } from 'store/setting/fixtures'

describe('UserSettingDelete should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <UserSettingDelete
        updateLocalStorage={(): void => {}}
        setting={setting}
      />
    )
  })
})
