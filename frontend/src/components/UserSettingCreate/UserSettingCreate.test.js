// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingCreate from './UserSettingCreate'

describe('UserSettingCreate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<UserSettingCreate setting={{}} />)
  })
})
