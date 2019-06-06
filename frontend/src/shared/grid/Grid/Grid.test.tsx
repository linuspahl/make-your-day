// libraries
import * as React from 'react'
import { render } from 'testUtils'
// components
import Grid from './Grid'

describe('Grid should', (): void => {
  test('display content', (): void => {
    const children = 'My special Grid content!'
    const { getByText } = render(<Grid>{children}</Grid>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
