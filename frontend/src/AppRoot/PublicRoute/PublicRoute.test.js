// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import PublicRoute from './PublicRoute'

describe('PublicRoute should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<PublicRoute />)
  })
})
