// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Grid from './Grid'

describe('Grid should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Grid>Content</Grid>)
  })
})
