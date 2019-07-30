// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import TextSmall from './TextSmall'

describe('TextSmall should', (): void => {
  test('display content', (): void => {
    const children = 'My special TextSmall content!'
    const { getByText } = renderWithAppRoot(<TextSmall>{children}</TextSmall>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
