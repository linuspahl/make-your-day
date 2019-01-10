// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Routes from './Routes'

describe('Routes should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Routes />)
  })
})
