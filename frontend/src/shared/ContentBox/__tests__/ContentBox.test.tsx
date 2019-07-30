// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import ContentBox from 'shared/ContentBox/ContentBox'

describe('ContentBox should', (): void => {
  test('display content', (): void => {
    const children = 'My special ContentBox content!'
    const { getByText } = renderWithAppRoot(<ContentBox>{children}</ContentBox>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
