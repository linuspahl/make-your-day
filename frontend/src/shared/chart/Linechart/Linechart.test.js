// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Linechart from './Linechart'

describe('Linechart should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Linechart />)
  })
})
