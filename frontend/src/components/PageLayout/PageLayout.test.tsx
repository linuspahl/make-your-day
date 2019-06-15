// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup, fireEvent } from 'testUtils'
// components
import PageLayout from './PageLayout'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PageLayout should', (): void => {
  const children = 'My special page content;'
  const propsFixture = {
    rootPath: '/',
    userSession,
  }
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageLayout {...propsFixture}>{children}</PageLayout>
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('toggle navigation when using alt key)', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageLayout {...propsFixture}>{children}</PageLayout>
    )
    fireEvent.keyDown(getByText(children), { key: 'Alt', keyCode: 18 })
    expect(getByText('Dashboard')).toBeInTheDocument()
    // Should not toggle navigation when using a different key
    fireEvent.keyDown(getByText(children), { key: 'ArrowUp', keyCode: 38 })
    expect(getByText('Dashboard')).toBeInTheDocument()
  })

  test('toggle navigation when using two finger gesture)', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageLayout {...propsFixture}>{children}</PageLayout>
    )
    fireEvent.touchStart(getByText(children), {
      type: 'touchstart',
      touches: [{}, {}],
    })
    expect(getByText('Dashboard')).toBeInTheDocument()
    // Should not toggle navigation doing a touch gesture key
    fireEvent.touchStart(getByText(children), {
      type: 'touchstart',
      touches: [{}],
    })
    expect(getByText('Dashboard')).toBeInTheDocument()
  })

  test('render without padding, if prop is provided)', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageLayout {...propsFixture} noPadding>
        {children}
      </PageLayout>
    )
    expect(getByText(children)).toHaveStyleRule('padding', '0')
  })

  test('show background image, if user enabled the option', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageLayout {...propsFixture}>{children}</PageLayout>,
      { themeProps: { showAppBgImage: true } }
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-image',
      'url(test-file-stub)'
    )
  })

  test('show background image, if user enabled the option and the night mode option', (): void => {
    const { getByText } = renderWithAppRoot(
      <PageLayout {...propsFixture}>{children}</PageLayout>,
      { themeProps: { showAppBgImage: true, nightMode: true } }
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-image',
      'url(test-file-stub)'
    )
  })
})
