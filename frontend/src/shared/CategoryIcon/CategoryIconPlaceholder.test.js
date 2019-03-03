// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIconPlaceholder from './CategoryIconPlaceholder'

describe('CategoryIconPlaceholder should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryIconPlaceholder />)
  })
})
