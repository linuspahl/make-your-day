// libraries
import React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Settings from 'containers/Settings/Settings'

describe('Settings should', (): void => {
  const propsFixture = {
    rootPath: '/settings',
    updateLocalStorage: (): void => {},
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
