// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EditIcon from './EditIcon'

describe('EditIcon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EditIcon />)
  })
})
