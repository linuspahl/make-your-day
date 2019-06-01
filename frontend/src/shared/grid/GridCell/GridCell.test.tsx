// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridCell from './GridCell'

describe('GridCell should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<GridCell>Content</GridCell>)
  })
})
