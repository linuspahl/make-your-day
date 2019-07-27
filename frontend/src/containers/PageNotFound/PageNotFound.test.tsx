// libraries
import * as React from 'react'
import { renderWithAppRoot } from 'testUtils'
// components
import PageNotFound from './PageNotFound'

describe('PageNotFound should', (): void => {
  test('render without crashing', (): void => {
    const { getByText } = renderWithAppRoot(<PageNotFound />)
    expect(getByText('Seite nicht gefunden')).toBeInTheDocument()
  })
})
