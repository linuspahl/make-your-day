// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Login from './Login'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Login should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Login
        updateLocalStorage={() => {}}
        createNotificationBanner={() => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
