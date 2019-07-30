// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import Box from 'shared/Box/Box'

describe('Box should', (): void => {
  test('display content', (): void => {
    const children = 'My special Box content!'
    const { getByText } = render(<Box>{children}</Box>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
