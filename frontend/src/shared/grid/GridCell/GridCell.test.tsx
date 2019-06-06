// libraries
import * as React from 'react'
import { render } from 'testUtils'
// components
import GridCell from './GridCell'

describe('GridCell should', (): void => {
  test('display content', (): void => {
    const children = 'My special GridCell content!'
    const { getByText } = render(<GridCell>{children}</GridCell>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
