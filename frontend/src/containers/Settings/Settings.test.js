// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Settings from './Settings'

describe('Settings should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Settings>Content</Settings>)
  })
})
