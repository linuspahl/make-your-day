// libraries
import React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import H1 from 'shared/H1/H1'

describe('H1 should', (): void => {
  const children = 'My special H1 content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(<H1>{children}</H1>)
    expect(getByText(children)).toBeInTheDocument()
  })

  test('have different margin when used with page context', (): void => {
    const { getByText } = renderWithAppRoot(<H1 context="page">{children}</H1>)
    expect(getByText(children)).toHaveStyleRule('margin-bottom', '3.75rem')
  })
})
