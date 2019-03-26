// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingDelete from './UserSettingDelete'
// fixtures
import { setting } from 'store/setting/fixtures'

describe('UserSettingDelete should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <UserSettingDelete
        updateLocalStorage={() => {}}
        setting={setting}
      />
    )
  })
})
