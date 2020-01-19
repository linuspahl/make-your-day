// libraries
import React from 'react'
// utils
import { render, cleanup, wait } from 'testUtils'
// components
import LoadingSpinner from 'shared/LoadingSpinner/LoadingSpinner'
import { act } from '@testing-library/react'

describe('LoadingSpinner should', (): void => {
  jest.useFakeTimers()
  afterEach(cleanup)

  test('should not render directly, by default', (): void => {
    const { queryByTestId } = render(<LoadingSpinner />)
    expect(queryByTestId('CenteredSpinner')).not.toBeInTheDocument()
  })

  test('should render directly, if prop hasDelay is false ', async (): Promise<
    void
  > => {
    const { getByTestId } = render(<LoadingSpinner />)
    act((): void => {
      // simulate timeout
      jest.runAllTimers()
    })
    await wait((): void => {
      expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
    })
  })
})
