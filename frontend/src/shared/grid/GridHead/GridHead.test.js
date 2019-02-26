// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridHead from './GridHead'

describe('GridHead should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<GridHead>Content</GridHead>)
  })
})
