// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import H2 from './H2'

describe('H2 should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<H2>Content</H2>)
  })
})
