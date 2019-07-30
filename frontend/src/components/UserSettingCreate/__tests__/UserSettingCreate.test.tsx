// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
// fixtures
import { setting } from 'store/setting/fixtures'

describe('UserSettingCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <UserSettingCreate
        updateLocalStorage={(): void => {}}
        setting={setting}
      />
    )
  })
})
