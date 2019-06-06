// libraries
import * as React from 'react'
import { render } from 'testUtils'
// components
import GridHead from './GridHead'

describe('GridHead should', (): void => {
  test('display content', (): void => {
    const children = 'My special GridHead content!'
    const { getByText } = render(<GridHead>{children}</GridHead>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
