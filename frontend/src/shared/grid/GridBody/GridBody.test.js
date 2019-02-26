// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridBody from './GridBody'

describe('GridBody should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<GridBody>Content</GridBody>)
  })
})
