// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Grid from './Grid'

describe('Grid should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Grid>Content</Grid>)
  })
})
