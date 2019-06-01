// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Login from './Login'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Login should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Login
        updateLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
