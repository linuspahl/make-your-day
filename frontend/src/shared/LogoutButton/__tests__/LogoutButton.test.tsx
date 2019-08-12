// libraries
import React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
  wait,
} from 'testUtils'
// components
import LogoutButton from 'shared/LogoutButton/LogoutButton'
// fixtures
import {
  deleteUserSessionSuccess,
  deleteUserSessionError,
} from 'store/userSession/fixtures'

describe('LogoutButton should', (): void => {
  const { id: userSessionId } = deleteUserSessionSuccess.request.variables
  // mock window confirm method
  window.confirm = (): boolean => true
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByText } = renderWithAppRoot(
      <LogoutButton
        userSessionId={userSessionId}
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    expect(getByText('Abmelden')).toBeInTheDocument()
  })

  test('show success notification and clear localstorage on successful logout', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const clearLocalStorageStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <LogoutButton
        userSessionId={userSessionId}
        clearLocalStorage={clearLocalStorageStub}
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    fireEvent.click(getByText('Abmelden'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      type: 'success',
      message: `Erfolgreich abgemeldet`,
    })
    expect(clearLocalStorageStub).toBeCalledTimes(1)
  })

  test('show error notification and clear localstorage on unsuccessful logout', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const clearLocalStorageStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <LogoutButton
        userSessionId={userSessionId}
        clearLocalStorage={clearLocalStorageStub}
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [deleteUserSessionError] }
    )
    fireEvent.click(getByText('Abmelden'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      type: 'error',
      message: 'Sitzung konnte auf dem Server nicht gelöscht werden',
    })
    expect(clearLocalStorageStub).toBeCalledTimes(1)
  })
})
