// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import FadeTransition from './FadeTransition'

describe('FadeTransition should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<FadeTransition />)
  })
})
