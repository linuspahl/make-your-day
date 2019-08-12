// libraries
import React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  cleanup,
} from 'testUtils'
// components
import NotificationBanner from './NotificationBanner'

describe('NotificationBanner should', (): void => {
  jest.useFakeTimers()
  afterEach(cleanup)

  test('show notification, for some seconds', (): void => {
    const ref: React.RefObject<NotificationBanner> = React.createRef()
    const { getByText, queryByText } = renderWithAppRoot(
      <NotificationBanner ref={ref} />
    )

    ref.current.addNotification({
      type: 'success',
      message: 'Your action was successful!',
    })

    expect(getByText('Your action was successful!')).toBeInTheDocument()

    // simulate timeout for visibility duration
    jest.runAllTimers()

    expect(queryByText('Your action was successful!')).not.toBeInTheDocument()
  })

  test('show latest notification', (): void => {
    const ref: React.RefObject<NotificationBanner> = React.createRef()
    const { getByText, queryByText } = renderWithAppRoot(
      <NotificationBanner ref={ref} />
    )

    ref.current.addNotification({
      type: 'success',
      message: 'Your action was successful!',
    })

    expect(getByText('Your action was successful!')).toBeInTheDocument()

    ref.current.addNotification({
      type: 'error',
      message: 'Your other action was unsuccessful!',
    })

    expect(
      queryByText('Your other action was unsuccessful!')
    ).toBeInTheDocument()
  })

  test('close notification, on close click', (): void => {
    const ref: React.RefObject<NotificationBanner> = React.createRef()
    const { getByText, queryByText, getByTestId } = renderWithAppRoot(
      <NotificationBanner ref={ref} />
    )

    ref.current.addNotification({
      message: 'Your action was successful!',
    })

    expect(getByText('Your action was successful!')).toBeInTheDocument()

    fireEvent.click(getByTestId('CircleTimer'), leftClickOption)

    expect(queryByText('Your action was successful!')).not.toBeInTheDocument()
  })
})
