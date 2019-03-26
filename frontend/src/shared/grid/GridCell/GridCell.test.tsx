// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridCell from './GridCell'

describe('GridCell should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<GridCell>Content</GridCell>)
  })
})
