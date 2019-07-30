// libraries
import * as React from 'react'
// utils
import { cleanup, renderWithAppRoot } from 'testUtils'
// components
import NavigationItem from 'components/NavigationItem/NavigationItem'

describe('NavigationItem should', (): void => {
  const propsFixture = {
    toggleAction: (): void => {},
    rootPath: '/',
    route: { title: 'Dashboard', path: '/' },
  }
  afterEach(cleanup)

  test('show provided route title', (): void => {
    const { getByText } = renderWithAppRoot(
      <NavigationItem {...propsFixture} />
    )
    expect(getByText('Dashboard')).toBeInTheDocument()
  })
})
