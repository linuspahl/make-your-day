// libraries
import React from 'react'
import { renderWithAppRoot } from 'testUtils'
// components
import PageNotFound from 'containers/PageNotFound/PageNotFound'

describe('PageNotFound should', (): void => {
  test('render without crashing', (): void => {
    const { getByText } = renderWithAppRoot(<PageNotFound />)
    expect(getByText('Seite nicht gefunden')).toBeInTheDocument()
  })
})
