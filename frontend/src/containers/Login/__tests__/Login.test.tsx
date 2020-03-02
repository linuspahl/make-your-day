// libraries
import React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Login from 'containers/Login/Login'

describe('Login should', (): void => {
  test('render without crashing', (): void => {
    // libraries
    const { getByText } = renderWithAppRoot(<Login />)
    expect(getByText('Anmeldung')).toBeInTheDocument()
  })
})
