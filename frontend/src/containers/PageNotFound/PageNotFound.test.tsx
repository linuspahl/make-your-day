// libraries
import * as React from 'react'
import { renderWithAppRoot } from 'testUtils'
// components
import PageNotFound from './PageNotFound'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PageNotFound should', (): void => {
  test('render without crashing', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageNotFound userSession={userSession} rootPath="/PageNotFound" />
    )
    expect(getByText('Seite nicht gefunden')).toBeInTheDocument()
  })
})
