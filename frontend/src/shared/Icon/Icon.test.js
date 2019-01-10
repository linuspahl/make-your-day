// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Icon from './Icon'

describe('Icon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Icon title="close" />)
  })
})
