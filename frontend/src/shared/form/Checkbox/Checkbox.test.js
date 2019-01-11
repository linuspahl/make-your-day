// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Checkbox from './Checkbox'

describe('Checkbox should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Checkbox />)
  })
})
