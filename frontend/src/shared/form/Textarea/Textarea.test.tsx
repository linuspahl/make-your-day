// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Textarea from './Textarea'

describe('Textarea should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Textarea name="name" value="value" onChange={(): void => {}} />
    )
    expect(getByTestId('Textarea')).toBeInTheDocument()
  })

  test('have an empty string as value, if provided value is null', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Textarea name="name" value={null} onChange={(): void => {}} />
    )
    expect(getByTestId('Textarea').innerHTML).toBe('')
  })

  test('look disabled, when disabled is provided', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Textarea name="name" value="value" onChange={(): void => {}} disabled />
    )
    expect(getByTestId('Textarea')).toHaveStyleRule('cursor', 'not-allowed')
  })
})
