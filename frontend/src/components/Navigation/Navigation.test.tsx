// libraries
import * as React from 'react'
// utils
import { navigationItems } from 'params'
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Navigation from './Navigation'

describe('Navigation should', (): void => {
  afterEach(cleanup)

  test('list navigation items', (): void => {
    const { getByText } = renderWithAppRoot(
      <Navigation toggleAction={(): void => {}} rootPath="/" />
    )
    navigationItems.forEach((navItem): void => {
      expect(getByText(navItem.title)).toBeInTheDocument()
    })
  })
})
