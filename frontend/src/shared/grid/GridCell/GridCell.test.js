// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridCell from './GridCell'

describe('GridCell should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<GridCell>Content</GridCell>)
  })
})
