// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSessionsOverview from './UserSessionsOverview'
// fixtures
import { userSession } from 'store/userSession/fixtures';

describe('UserSessionsOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <UserSessionsOverview
        clearLocalStorage={() => {}}
        createNotificationBanner={() => {}}
        userSession={userSession}
      />)
  })
})
