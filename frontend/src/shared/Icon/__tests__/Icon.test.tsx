// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import Icon from 'shared/Icon/Icon'

describe('Icon should', (): void => {
  test('render without crashing', (): void => {
    const { getByTestId } = render(<Icon title="checkmark" />)
    expect(getByTestId('Icon')).toBeInTheDocument()
  })
})
