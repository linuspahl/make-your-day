// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Row from 'shared/form/Row/Row'

describe('Row should', (): void => {
  afterEach(cleanup)

  const children = 'My special Row content!'
  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(<Row>{children}</Row>)

    expect(getByText(children)).toBeInTheDocument()
  })

  test('look disabled, when disabled is provided', (): void => {
    const { getByText } = renderWithAppRoot(<Row disabled>{children}</Row>)
    expect(getByText(children)).toHaveStyleRule('cursor', 'not-allowed')
  })
})
