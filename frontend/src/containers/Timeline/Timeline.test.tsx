// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Timeline from './Timeline'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Timeline should', (): void => {
  test('render timeline day edit route', (): void => {
    const { getByText } = renderWithAppRoot(
      <Timeline rootPath="/timeline" userSession={userSession} />,
      { route: '/timeline/2010-12-20' }
    )
    expect(getByText('Einträge 2010-12-20')).toBeInTheDocument()
  })
})
