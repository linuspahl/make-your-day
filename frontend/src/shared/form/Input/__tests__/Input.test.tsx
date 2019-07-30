// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Input from 'shared/form/Input/Input'

describe('Input should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Input
        name="username"
        onChange={(): void => {}}
        tabIndex={-1}
        value="My secial username"
      />
    )
    expect(getByTestId('Input')).toBeInTheDocument()
  })

  test('have an empty string as value, if provided value is null', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Input
        name="username"
        onChange={(): void => {}}
        tabIndex={-1}
        value={null}
      />
    )
    expect(getByTestId('Input')).toHaveAttribute('value', '')
  })

  test('look disabled, when disabled is provided', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Input
        name="username"
        onChange={(): void => {}}
        tabIndex={-1}
        value="My secial username"
        disabled
      />
    )
    expect(getByTestId('Input')).toHaveStyleRule('cursor', 'not-allowed')
  })
})
