// libraries
import React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Settings from 'containers/Settings/Settings'
// fixtures
import { userSession } from 'store/userSession/fixtures'
import { userSetting } from 'store/userSetting/fixtures'

describe('Settings should', (): void => {
  const propsFixture = {
    rootPath: '/settings',
    createNotificationBanner: (): void => {},
    updateLocalStorage: (): void => {},
    userSettings: { nightMode: userSetting },
    userSession,
  }
  afterEach(cleanup)

  test('render settings overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(<Settings {...propsFixture} />, {
      route: '/settings',
    })
    expect(getByTestId('UserSettingsOverview')).toBeInTheDocument()
  })

  test('render sessions overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(<Settings {...propsFixture} />, {
      route: '/settings/sessions',
    })
    expect(getByTestId('UserSessionsOverview')).toBeInTheDocument()
  })
})
