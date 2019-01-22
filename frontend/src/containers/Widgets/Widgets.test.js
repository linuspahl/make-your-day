// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Widgets from './Widgets'

describe('Widgets should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Widgets>Content</Widgets>)
  })
})
