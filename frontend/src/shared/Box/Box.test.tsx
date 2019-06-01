// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Box from './Box'

describe('Box should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Box>Content</Box>)
  })
})
