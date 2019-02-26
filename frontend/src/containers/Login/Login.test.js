// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Login from './Login'

describe('Login should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Login updateLocalStorage={() => {}} />)
  })
})
