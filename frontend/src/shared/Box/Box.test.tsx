// libraries
import * as React from 'react'
import { render } from 'testUtils'
// components
import Box from './Box'

describe('Box should', (): void => {
  test('display content', (): void => {
    const children = 'My special Box content!'
    const { getByText } = render(<Box>{children}</Box>)

    expect(getByText(children)).toBeInTheDocument()
  })
})
