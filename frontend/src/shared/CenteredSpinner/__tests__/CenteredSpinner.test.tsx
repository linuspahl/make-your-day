// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import CenteredSpinner from '../CenteredSpinner'

describe('CenteredSpinner should', (): void => {
  test('render without crashing', (): void => {
    const { getByTestId } = render(<CenteredSpinner />)
    expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
  })
})
