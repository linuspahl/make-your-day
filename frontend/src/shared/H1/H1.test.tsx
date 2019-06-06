// libraries
import * as React from 'react'
// utils
import { render, cleanup } from 'testUtils'
// components
import H1 from './H1'

describe('H1 should', (): void => {
  const children = 'My special H1 content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = render(<H1>{children}</H1>)
    expect(getByText(children)).toBeInTheDocument()
  })

  test('have different margin when used with page context', (): void => {
    const { getByText } = render(<H1 context="page">{children}</H1>)
    expect(getByText(children)).toHaveStyleRule('margin-bottom', '60px')
  })
})
