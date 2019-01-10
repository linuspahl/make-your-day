// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CloseIcon from './CloseIcon'

describe('CloseIcon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CloseIcon />)
  })
})
