// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import TextBig from './TextBig'

describe('TextBig should', (): void => {
  test('display content', (): void => {
    const children = 'My special TextBig content!'
    const { getByText } = renderWithAppRoot(<TextBig>{children}</TextBig>)
    expect(getByText(children)).toBeInTheDocument()
  })
})
