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
      <LogoutIcon userSessionId={userSessionId} />,
      {
        mocks: [deleteUserSessionSuccess],
      }
    )
    expect(getByTestId('Icon')).toBeInTheDocument()
  })

  test('show success notification and clear localstorage on successful logout', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => true

    const createNotificationBannerStub = jest.fn()
    const clearLocalStorageStub = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon userSessionId={userSessionId} />,
      {
        context: {
          createNotificationBanner: createNotificationBannerStub,
          clearLocalStorage: clearLocalStorageStub,
        },
        mocks: [deleteUserSessionSuccess],
      }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
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
    window.confirm = (): boolean => true

    const createNotificationBannerStub = jest.fn()
    const clearLocalStorageStub = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon userSessionId={userSessionId} />,
      {
        context: {
          createNotificationBanner: createNotificationBannerStub,
          clearLocalStorage: clearLocalStorageStub,
        },
        mocks: [deleteUserSessionError],
      }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      type: 'error',
      message: 'Sitzung konnte auf dem Server nicht gelöscht werden',
    })
    expect(clearLocalStorageStub).toBeCalledTimes(1)
  })

  test('not logout, when user does not confirm logout', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => false

    const createNotificationBannerStub = jest.fn()
    const clearLocalStorageStub = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <LogoutIcon userSessionId={userSessionId} />,
      {
        context: {
          createNotificationBanner: createNotificationBannerStub,
          clearLocalStorage: clearLocalStorageStub,
        },
        mocks: [deleteUserSessionError],
      }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerStub).not.toBeCalled()
    expect(clearLocalStorageStub).not.toBeCalled()
  })
})
