// libraries
import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  cleanup,
} from 'testUtils'
// components
import LogoutButton from './LogoutButton'
// graphql
import { wait } from '@testing-library/react'
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
      <MockedProvider mocks={[deleteUserSessionSuccess]} addTypename={false}>
        <LogoutButton
          userSessionId={userSessionId}
          clearLocalStorage={(): void => {}}
          createNotificationBanner={(): void => {}}
        />
      </MockedProvider>
    )
    expect(getByText('Abmelden')).toBeInTheDocument()
  })

  test('show success notification and clear localstorage on successful logout', async (): Promise<
    void
  > => {
    const createNotificationBannerEvent = jest.fn()
    const clearLocalStorageEvent = jest.fn()
    const { getByText } = renderWithAppRoot(
      <MockedProvider mocks={[deleteUserSessionSuccess]} addTypename={false}>
        <LogoutButton
          userSessionId={userSessionId}
          clearLocalStorage={clearLocalStorageEvent}
          createNotificationBanner={createNotificationBannerEvent}
        />
      </MockedProvider>
    )
    fireEvent.click(getByText('Abmelden'), leftClickOption)
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
    const createNotificationBannerEvent = jest.fn()
    const clearLocalStorageEvent = jest.fn()
    const { getByText } = renderWithAppRoot(
      <MockedProvider mocks={[deleteUserSessionError]} addTypename={false}>
        <LogoutButton
          userSessionId={userSessionId}
          clearLocalStorage={clearLocalStorageEvent}
          createNotificationBanner={createNotificationBannerEvent}
        />
      </MockedProvider>
    )
    fireEvent.click(getByText('Abmelden'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(createNotificationBannerEvent).toBeCalledTimes(1)
    expect(createNotificationBannerEvent).toBeCalledWith({
      type: 'error',
      message: 'Sitzung konnte auf dem Server nicht gelöscht werden',
    })
    expect(clearLocalStorageEvent).toBeCalledTimes(1)
  })
})
