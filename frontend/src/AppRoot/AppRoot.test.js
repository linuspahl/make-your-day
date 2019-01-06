// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import App from './AppRoot'

describe('App should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<App />)
  })
})
