// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CircleTimer from './CircleTimer'

describe('CircleTimer should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CircleTimer />)
  })
})
