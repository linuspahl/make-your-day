// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Input from './Input'

describe('Input should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Input />)
  })
})
