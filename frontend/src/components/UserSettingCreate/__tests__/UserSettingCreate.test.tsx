// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
// fixtures
import { setting } from 'store/setting/fixtures'

describe('UserSettingCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <UserSettingCreate setting={setting} />
    )
  })
})
