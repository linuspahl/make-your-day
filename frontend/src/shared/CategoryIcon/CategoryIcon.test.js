// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIcon from './CategoryIcon'

describe('CategoryIcon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryIcon />)
  })
})