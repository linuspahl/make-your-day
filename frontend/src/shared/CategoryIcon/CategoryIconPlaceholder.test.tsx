// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import CategoryIconPlaceholder from './CategoryIconPlaceholder'

describe('CategoryIconPlaceholder should', (): void => {
  test('render without chrashing', (): void => {
    const { getByTestId } = renderWithAppRoot(<CategoryIconPlaceholder />)
    expect(getByTestId('CategoryIconPlaceholder')).toBeInTheDocument()
  })
})
