// libraries
import * as React from 'react'
// utils
import { render, cleanup } from 'testUtils'
// components
import Row from './Row'

describe('Row should', (): void => {
  beforeEach(cleanup)

  const children = 'My special Row content!'
  test('display content', (): void => {
    const { getByText } = render(<Row>{children}</Row>)

    expect(getByText(children)).toBeInTheDocument()
  })

  test('look disabled, when disabled is provided', (): void => {
    const { getByText } = render(<Row disabled>{children}</Row>)
    expect(getByText(children)).toHaveStyleRule('cursor', 'not-allowed')
  })
})
