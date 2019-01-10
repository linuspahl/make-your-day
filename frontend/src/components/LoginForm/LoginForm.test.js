// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import LoginForm from './LoginForm'

describe('LoginForm should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<LoginForm />)
  })
})
