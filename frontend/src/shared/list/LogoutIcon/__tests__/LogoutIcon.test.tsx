// libraries
import * as React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
  wait,
} from 'testUtils'
// components
import LogoutIcon from 'shared/list/LogoutIcon/LogoutIcon'
// fixtures
import {
  deleteUserSessionSuccess,
  deleteUserSessionError,
} from 'store/userSession/fixtures'

describe('LogoutIcon should', (): void => {
  const { id: userSessionId } = deleteUserSessionSuccess.request.variables
  // mock window confirm method
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon
        userSessionId={userSessionId}
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    expect(getByTestId('Icon')).toBeInTheDocument()
  })

  test('show success notification and clear localstorage on successful logout', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => true

    const createNotificationBannerEvent = jest.fn()
    const clearLocalStorageEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon
        userSessionId={userSessionId}
        clearLocalStorage={clearLocalStorageEvent}
        createNotificationBanner={createNotificationBannerEvent}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerEvent).toBeCalledTimes(1)
    expect(createNotificationBannerEvent).toBeCalledWith({
      type: 'success',
      message: `Erfolgreich abgemeldet`,
    })
    expect(clearLocalStorageEvent).toBeCalledTimes(1)
  })

  test('show error notification and clear localstorage on unsuccessful logout', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => true

    const createNotificationBannerEvent = jest.fn()
    const clearLocalStorageEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon
        userSessionId={userSessionId}
        clearLocalStorage={clearLocalStorageEvent}
        createNotificationBanner={createNotificationBannerEvent}
      />,
      { mocks: [deleteUserSessionError] }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerEvent).toBeCalledTimes(1)
    expect(createNotificationBannerEvent).toBeCalledWith({
      type: 'error',
      message: 'Sitzung konnte auf dem Server nicht gelöscht werden',
    })
    expect(clearLocalStorageEvent).toBeCalledTimes(1)
  })

  test('not logout, when user does not confirm logout', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => false

    const createNotificationBannerEvent = jest.fn()
    const clearLocalStorageEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon
        userSessionId={userSessionId}
        clearLocalStorage={clearLocalStorageEvent}
        createNotificationBanner={createNotificationBannerEvent}
      />,
      { mocks: [deleteUserSessionError] }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerEvent).not.toBeCalled()
    expect(clearLocalStorageEvent).not.toBeCalled()
  })
})
