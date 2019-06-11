// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import Dashboard from './Dashboard'
// fixtures
import { userSession } from 'store/userSession/fixtures'
import { getWidgetsSuccess, getWidgetsError } from 'store/widget/fixtures'

describe('Dashboard should', (): void => {
  test('render dashboard and fetch widgets', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <Dashboard
        createNotificationBanner={(): void => {}}
        rootPath="/dashboard"
        userSession={userSession}
      />,
      { route: '/dashboard', mocks: [getWidgetsSuccess] }
    )
    await wait()
    expect(getByText('Notiz')).toBeInTheDocument()
  })

  test('render dashboard and show error message on widgets fetch error', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(
      <Dashboard
        createNotificationBanner={(): void => {}}
        rootPath="/dashboard"
        userSession={userSession}
      />,
      { route: '/dashboard', mocks: [getWidgetsError] }
    )
    await wait()
    expect(
      getByText('Widgets konnten nicht geladen werden')
    ).toBeInTheDocument()
  })
})
