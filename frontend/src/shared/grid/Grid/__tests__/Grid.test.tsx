// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import Grid from 'shared/grid/Grid/Grid'

describe('Grid should', (): void => {
  test('display content', (): void => {
    const children = 'My special Grid content!'
    const { getByText } = render(<Grid>{children}</Grid>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
