// libraries
import * as React from 'react'
import { render } from 'testUtils'
// components
import Icon from './Icon'

describe('Icon should', (): void => {
  test('render without crashing', (): void => {
    const { getByTestId } = render(<Icon title="checkmark" />)
    expect(getByTestId('Icon')).toBeInTheDocument()
  })
})
