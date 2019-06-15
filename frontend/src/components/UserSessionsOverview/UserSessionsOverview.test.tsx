// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup } from 'testUtils'
// components
import UserSessionsOverview from './UserSessionsOverview'
// fixtures
import { userSession, getUserSessionsSuccess } from 'store/userSession/fixtures'

describe('UserSessionsOverview should', (): void => {
  const propsFixture = {
    clearLocalStorage: (): void => {},
    createNotificationBanner: (): void => {},
    currentUserSession: userSession,
  }
  afterEach(cleanup)

  test('list fetched userSessions', async (): Promise<void> => {
    const { getAllByText } = renderWithAppRoot(
      <UserSessionsOverview {...propsFixture} />,
      {
        mocks: [getUserSessionsSuccess],
      }
    )
    // Wait for the Query component
    await wait()
    expect(getAllByText(userSession.device)).toHaveLength(2)
  })
})
