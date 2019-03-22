// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import H1 from './H1'

describe('H1 should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<H1>Content</H1>)
  })
})
