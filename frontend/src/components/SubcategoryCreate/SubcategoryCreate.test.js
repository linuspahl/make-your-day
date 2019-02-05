// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryCreate from './SubcategoryCreate'

describe('SubcategoryCreate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<SubcategoryCreate />)
  })
})
