// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import AppBackground from './AppBackground'

describe('AppBackground should', (): void => {
  const children = 'My special page content;'
  afterEach(cleanup)

  test('show background image, if user enabled the option', (): void => {
    const { getByText } = renderWithAppRoot(
      <AppBackground>{children}</AppBackground>,
      { themeProps: { showAppBgImage: true } }
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-image',
      'url(test-file-stub)'
    )
  })

  test('show background image, if user enabled the option and the night mode option', (): void => {
    const { getByText } = renderWithAppRoot(
      <AppBackground>{children}</AppBackground>,
      { themeProps: { showAppBgImage: true, nightMode: true } }
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-image',
      'url(test-file-stub)'
    )
  })
})
