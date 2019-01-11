// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryCreate from './CategoryCreate'

describe('CategoryCreate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryCreate />)
  })
})
