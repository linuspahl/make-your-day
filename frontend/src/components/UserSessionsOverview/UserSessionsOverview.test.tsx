// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSessionsOverview from './UserSessionsOverview'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('UserSessionsOverview should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <UserSessionsOverview
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        userSession={userSession}
      />
    )
  })
})
