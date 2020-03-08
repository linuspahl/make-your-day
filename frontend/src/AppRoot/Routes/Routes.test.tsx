// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Routes from './Routes'

describe('Routes should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Routes />)
  })
})
