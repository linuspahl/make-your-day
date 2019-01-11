// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryEdit from './CategoryEdit'

describe('CategoryEdit should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryEdit />)
  })
})
