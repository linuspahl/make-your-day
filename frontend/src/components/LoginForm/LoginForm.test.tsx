// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import LoginForm from './LoginForm'

describe('LoginForm should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <LoginForm
        updateLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
      />
    )
  })
})
