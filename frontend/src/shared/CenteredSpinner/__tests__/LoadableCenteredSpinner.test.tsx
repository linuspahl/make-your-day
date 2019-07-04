// libraries
import * as React from 'react'
// utils
import { render, cleanup } from 'testUtils'
// components
import LoadableCenteredSpinner from '../LoadableCenteredSpinner'

describe('LoadableCenteredSpinner should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = render(<LoadableCenteredSpinner pastDelay />)
    expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
  })

  test('show info, on error', (): void => {
    const { queryByTestId, getByText } = render(
      <LoadableCenteredSpinner error={new Error()} />
    )
    expect(getByText('Retry')).toBeInTheDocument()
    expect(queryByTestId('CenteredSpinner')).not.toBeInTheDocument()
  })

  test('not render', (): void => {
    const { queryByTestId } = render(<LoadableCenteredSpinner />)
    expect(queryByTestId('CenteredSpinner')).not.toBeInTheDocument()
  })
})
