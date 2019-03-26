// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import LoginForm from './LoginForm'

describe('LoginForm should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <LoginForm
        updateLocalStorage={() => {}}
        createNotificationBanner={() => {}}
      />
    )
  })
})
