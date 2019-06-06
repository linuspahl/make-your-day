// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
import colorTheme from 'theme'
// components
import Checkbox from './Checkbox'

describe('Checkbox should', (): void => {
  const theme = colorTheme()
  afterEach(cleanup)

  test('show a checkmark icon, when check', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Checkbox
        name="newsletter"
        onChange={(): void => {}}
        tabIndex={0}
        value={true}
      />
    )
    expect(getByTestId('Icon')).toBeInTheDocument()
  })

  test('show a checkmark icon, when check', (): void => {
    const { queryByTestId } = renderWithAppRoot(
      <Checkbox
        name="newsletter"
        onChange={(): void => {}}
        tabIndex={0}
        value={false}
      />
    )
    expect(queryByTestId('Icon')).not.toBeInTheDocument()
  })

  test('look disabled, when disabled is provided', (): void => {
    const { queryByTestId } = renderWithAppRoot(
      <Checkbox
        disabled
        name="newsletter"
        onChange={(): void => {}}
        tabIndex={0}
        value={false}
      />
    )
    expect(queryByTestId('Checkbox')).toHaveStyleRule('color', theme.border)
  })
})
