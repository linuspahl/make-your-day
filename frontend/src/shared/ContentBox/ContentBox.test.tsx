// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import ContentBox from './ContentBox'

describe('ContentBox should', (): void => {
  test('display content', (): void => {
    const children = 'My special ContentBox content!'
    const { getByText } = render(<ContentBox>{children}</ContentBox>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
