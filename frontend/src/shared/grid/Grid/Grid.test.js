// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Grid from './Grid'

describe('Grid should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Grid>Content</Grid>)
  })
})
