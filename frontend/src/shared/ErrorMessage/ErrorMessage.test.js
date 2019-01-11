// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ErrorMessage />)
  })
})
