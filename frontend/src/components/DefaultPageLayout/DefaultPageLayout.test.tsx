// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import DefaultPageLayout from './DefaultPageLayout'

describe('DefaultPageLayout should', (): void => {
  test('display content', (): void => {
    const children = 'My special DefaultPageLayout content!'
    const { getByText } = renderWithAppRoot(
      <DefaultPageLayout>{children}</DefaultPageLayout>
    )
    expect(getByText(children)).toBeInTheDocument()
  })
})
