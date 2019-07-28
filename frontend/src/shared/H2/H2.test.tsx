// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import H2 from './H2'

describe('H2 should', (): void => {
  test('display content', (): void => {
    const children = 'My special H2 content!'
    const { getByText } = renderWithAppRoot(<H2>{children}</H2>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
