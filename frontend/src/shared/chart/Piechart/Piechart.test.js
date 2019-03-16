// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Piechart from './Piechart'

describe('Piechart should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Piechart />)
  })
})
