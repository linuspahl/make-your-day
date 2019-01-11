// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import NoResult from './NoResult'

describe('NoResult should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<NoResult />)
  })
})
