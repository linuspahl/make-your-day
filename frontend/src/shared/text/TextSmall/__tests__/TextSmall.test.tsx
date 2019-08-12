// libraries
import React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import TextSmall from 'shared/text/TextSmall/TextSmall'

describe('TextSmall should', (): void => {
  test('display content', (): void => {
    const children = 'My special TextSmall content!'
    const { getByText } = renderWithAppRoot(<TextSmall>{children}</TextSmall>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
