// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryEdit from './SubcategoryEdit'

describe('SubcategoryEdit should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<SubcategoryEdit />)
  })
})
