// libraries
import React from 'react'
import Testrender from 'react-test-renderer/shallow'
// components
import H1 from './H1'

describe('H1 should', () => {
  test('render without crashing', () => {
    const renderer = new ShallowRenderer()
    renderer.create(<H1>Content</H1>)
  })
})
