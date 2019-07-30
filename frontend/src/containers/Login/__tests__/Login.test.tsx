// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Login from 'containers/Login/Login'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Login should', (): void => {
  test('render without crashing', (): void => {
    // libraries
    const { getByText } = renderWithAppRoot(
      <Login
        updateLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        userSession={userSession}
        rootPath="/login"
      />
    )
    expect(getByText('Anmeldung')).toBeInTheDocument()
  })
})
