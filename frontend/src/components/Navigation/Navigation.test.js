// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Navigation from './Navigation'

describe('Navigation should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Navigation />)
  })
})
