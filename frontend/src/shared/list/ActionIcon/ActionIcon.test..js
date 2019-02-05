// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ActionIcon from './ActionIcon'

describe('ActionIcon should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ActionIcon />)
  })
})
