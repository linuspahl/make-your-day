// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import GridBody from './GridBody'

describe('GridBody should', (): void => {
  test('display content', (): void => {
    const children = 'My special GridBody content!'
    const { getByText } = render(
      <GridBody columnAmount={1}>{children}</GridBody>
    )
    expect(getByText(children)).toBeInTheDocument()
  })
})
