// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import TextLarge from 'shared/text/TextLarge/TextLarge'

describe('TextLarge should', (): void => {
  test('display content', (): void => {
    const children = 'My special TextLarge content!'
    const { getByText } = renderWithAppRoot(<TextLarge>{children}</TextLarge>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
