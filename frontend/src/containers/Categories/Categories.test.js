// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Categories from './Categories'

describe('Categories should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Categories>Content</Categories>)
  })
})
