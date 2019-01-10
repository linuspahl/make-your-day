// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import PrivateRoute from './PrivateRoute'

describe('PrivateRoute should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<PrivateRoute />)
  })
})
