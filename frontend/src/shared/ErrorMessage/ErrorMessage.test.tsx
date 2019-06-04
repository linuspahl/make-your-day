// libraries
import * as React from 'react'
import { render, cleanup } from 'testUtils'
// components
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage should', (): void => {
  const message = 'My special Error message!'
  const error = 'Apollo error object, or error stack trace'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = render(
      <ErrorMessage message={message} error={error} />
    )
    expect(getByText(message)).toBeInTheDocument()
  })
})
