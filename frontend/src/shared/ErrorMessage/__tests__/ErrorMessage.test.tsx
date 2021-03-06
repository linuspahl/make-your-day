// libraries
import React from 'react'
// utils
import { render, cleanup } from 'testUtils'
// components
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'

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
