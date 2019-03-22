// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import H1 from './H1.tsx'

describe('H1 should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<H1>Content</H1>)
  })
})
