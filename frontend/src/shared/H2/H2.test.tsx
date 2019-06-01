// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import H2 from './H2'

describe('H2 should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<H2>Content</H2>)
  })
})
