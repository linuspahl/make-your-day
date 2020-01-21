// libraries
import React from 'react'
// utils
import { navigationItems } from 'params'
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Navigation from 'components/Navigation/Navigation'

describe('Navigation should', (): void => {
  afterEach(cleanup)

  test('list navigation items', (): void => {
    const { getByText } = renderWithAppRoot(
      <Navigation
        rootPath="/"
        animateOnClose
        open
        toggleAction={(): void => {}}
      />
    )
    navigationItems.forEach((navItem): void => {
      expect(getByText(navItem.title)).toBeInTheDocument()
    })
  })
})
