// libraries
import * as React from 'react'
import { render, cleanup } from 'testUtils'
const utilsMock = jest.genMockFromModule('utils/utils')
// components
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage should', (): void => {
  const message = 'My special Error message!'
  const error = 'Apollo error object, or error stack trace'
  jest.mock(
    'utils/utils',
    (): any => {
      return {
        logError: jest.fn((p1, p2) => p2),
      }
    }
  )

  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = render(
      <ErrorMessage message={message} error={error} />
    )
    expect(getByText(message)).toBeInTheDocument()
  })

  test('log the provided error', (): void => {
    render(<ErrorMessage message={message} error={error} />)
    expect(utilsMock.logError).toBeCalledTimes(1)
  })
})
