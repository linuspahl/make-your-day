// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Barchart from './Barchart'

describe('Barchart should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Barchart />)
  })
})
