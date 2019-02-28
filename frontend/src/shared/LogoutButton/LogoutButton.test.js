// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import LogoutButton from './LogoutButton'

describe('LogoutButton should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<LogoutButton />)
  })
})
