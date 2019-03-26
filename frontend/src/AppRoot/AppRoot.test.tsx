// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import App from './AppRoot'

describe('App should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<App />)
  })
})
