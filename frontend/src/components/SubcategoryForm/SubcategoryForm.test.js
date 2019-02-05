// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryForm from './SubcategoryForm'

describe('SubcategoryForm should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<SubcategoryForm category={{}} />)
  })
})
