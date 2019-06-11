// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import NoResult from './NoResult'

describe('NoResult should', (): void => {
  test('display content', (): void => {
    const message = 'My special NoResult content!'
    const { getByText } = render(<NoResult message={message} />)
    expect(getByText(message)).toBeInTheDocument()
  })

  test('display default text, if no message is defined', (): void => {
    const { getByText } = render(<NoResult />)
    expect(getByText('Kein Eintrag vorhanden')).toBeInTheDocument()
  })
})
