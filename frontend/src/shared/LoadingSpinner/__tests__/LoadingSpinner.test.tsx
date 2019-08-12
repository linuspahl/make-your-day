// libraries
import React from 'react'
// utils
import { render, cleanup } from 'testUtils'
// components
import LoadingSpinner from 'shared/LoadingSpinner/LoadingSpinner'

describe('LoadingSpinner should', (): void => {
  jest.useFakeTimers()
  afterEach(cleanup)

  test('should not render directly, if hasDelay prop is provided ', (): void => {
    const { queryByTestId } = render(<LoadingSpinner hasDelay />)
    expect(queryByTestId('CenteredSpinner')).not.toBeInTheDocument()
  })

  test('should render directly, if prop hasDelay is not provided ', (): void => {
    const { getByTestId } = render(<LoadingSpinner />)

    // simulate timeout
    jest.runAllTimers()

    expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
  })
})
