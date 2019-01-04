// libraries
import React from 'react'
import App from './App'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('App should', () => {
  const renderer = new ShallowRenderer()
  test('render without crashing', () => {
    renderer.render(<App />)
  })
})
