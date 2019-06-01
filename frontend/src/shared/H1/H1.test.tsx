// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import H1 from './H1'

describe('H1 should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<H1>Content</H1>)
  })
})
