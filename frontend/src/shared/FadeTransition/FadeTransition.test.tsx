// libraries
import * as React from 'react'
// utils
import { render, cleanup } from 'testUtils'
// components
import FadeTransition from './FadeTransition'

describe('FadeTransition should', (): void => {
  const children = 'My special FadeTransition content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = render(<FadeTransition>{children}</FadeTransition>)
    expect(getByText(children)).toBeInTheDocument()
  })

  test('should have full height and width when props are provided', (): void => {
    const { getByText } = render(
      <FadeTransition fullHeight fullWidth>
        {children}
      </FadeTransition>
    )
    expect(getByText(children)).toHaveStyleRule('width', '100%')
    expect(getByText(children)).toHaveStyleRule('height', '100%')
  })
})
