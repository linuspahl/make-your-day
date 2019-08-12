// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import App from '../AppRoot'

describe('App should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<App />)
  })
})
