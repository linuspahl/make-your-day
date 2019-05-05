// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Box from './Box'

describe('Box should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Box>Content</Box>)
  })
})
