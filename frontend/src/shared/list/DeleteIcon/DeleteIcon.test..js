// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import DeleteIcon from './DeleteIcon'

describe('DeleteIcon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<DeleteIcon />)
  })
})
