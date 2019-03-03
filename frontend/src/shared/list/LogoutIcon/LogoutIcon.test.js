// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import LogoutIcon from './LogoutIcon'

describe('LogoutIcon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<LogoutIcon />)
  })
})
