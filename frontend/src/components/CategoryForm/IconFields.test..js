// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryForm from './CategoryForm'

describe('CategoryForm should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryForm />)
  })
})
