// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingCreate from './UserSettingCreate'
// fixtures
import { setting } from 'store/setting/fixtures'

describe('UserSettingCreate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <UserSettingCreate updateLocalStorage={() => {}} setting={setting} />
    )
  })
})
