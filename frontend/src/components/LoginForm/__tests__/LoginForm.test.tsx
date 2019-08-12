// libraries
import React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  Matcher,
  renderWithAppRoot,
  SelectorMatcherOptions,
  wait,
} from 'testUtils'
// components
import LoginForm from 'components/LoginForm/LoginForm'
// fixtures
import {
  loginUserSuccess,
  loginUserError,
  userSession,
} from 'store/userSession/fixtures'

export const initLoginForm = async (
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement
): Promise<void> => {
  // fill form
  fireEvent.change(getByLabelText('Username'), {
    target: { value: 'Username 1' },
  })
  fireEvent.change(getByLabelText('Password'), {
    target: { value: 'Password 1' },
  })
  await wait()
}

describe('LoginForm should', (): void => {
  // Mock navigator.platform
  Object.defineProperty(navigator, 'platform', {
    get: (): string => {
      return 'Mac'
    },
  })
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByText } = renderWithAppRoot(
      <LoginForm
        createNotificationBanner={(): void => {}}
        updateLocalStorage={(): void => {}}
      />,
      { mocks: [loginUserSuccess] }
    )

    // Submit form
    expect(getByText('Anmelden')).toBeInTheDocument()
  })

  test('update localstorage on successful logout', async (): Promise<void> => {
    const updateLocalStorageStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <LoginForm
        createNotificationBanner={(): void => {}}
        updateLocalStorage={updateLocalStorageStub}
      />,
      { mocks: [loginUserSuccess] }
    )
    initLoginForm(getByLabelText)
    // Submit form
    fireEvent.click(getByText('Anmelden'), leftClickOption)
    await wait()

    expect(updateLocalStorageStub).toBeCalledTimes(1)
    expect(updateLocalStorageStub).toBeCalledWith({
      authToken: userSession.token,
      userId: userSession.userId,
      userSessionId: userSession.id,
      expiresAt: userSession.expiresAt,
      nightmode: true,
    })
  })

  test('create notfication banner on unsuccessful login', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <LoginForm
        createNotificationBanner={createNotificationBannerStub}
        updateLocalStorage={(): void => {}}
      />,
      { mocks: [loginUserError] }
    )
    initLoginForm(getByLabelText)
    // Submit form
    fireEvent.click(getByText('Anmelden'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      type: 'error',
      message: 'Anmeldung fehlgeschlagen',
    })
  })
})
