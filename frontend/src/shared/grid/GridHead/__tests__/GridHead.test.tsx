// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import GridHead from 'shared/grid/GridHead/GridHead'

describe('GridHead should', (): void => {
  test('display content', (): void => {
    const children = 'My special GridHead content!'
    const { getByText } = render(<GridHead>{children}</GridHead>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
