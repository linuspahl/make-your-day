// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Settings from './Settings'
// fixtures
import { userSession } from 'store/userSession/fixtures'
import { userSetting } from 'store/userSetting/fixtures'

describe('Settings should', (): void => {
  afterEach(cleanup)

  test('render settings overview route', (): void => {
    const { getByText } = renderWithAppRoot(
      <Settings
        rootPath="/settings"
        userSession={userSession}
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        updateLocalStorage={(): void => {}}
        userSettings={{ nightMode: userSetting }}
      />,
      { route: '/settings' }
    )
    expect(getByText('Einstellungen')).toBeInTheDocument()
  })

  test('render sessions overview route', (): void => {
    const { getByText } = renderWithAppRoot(
      <Settings
        rootPath="/settings"
        userSession={userSession}
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        updateLocalStorage={(): void => {}}
        userSettings={{ nightMode: userSetting }}
      />,
      { route: '/settings/sessions' }
    )
    expect(getByText('Angemeldete Geräte')).toBeInTheDocument()
  })
})
