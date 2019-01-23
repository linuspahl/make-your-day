// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingDelete from './UserSettingDelete'

describe('UserSettingDelete should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<UserSettingDelete category={{}} />)
  })
})
