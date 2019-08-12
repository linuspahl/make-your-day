// libraries
import React from 'react'
// utils
import { renderWithAppRoot, cleanup, fireEvent } from 'testUtils'
// components
import InAppLyout from 'components/InAppLayout/InAppLayout'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('InAppLyout should', (): void => {
  const children = 'My special page content;'
  const propsFixture = {
    rootPath: '/',
    userSession,
  }
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(
      <InAppLyout {...propsFixture}>{children}</InAppLyout>
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('toggle navigation when using alt key)', (): void => {
    const { getByText } = renderWithAppRoot(
      <InAppLyout {...propsFixture}>{children}</InAppLyout>
    )
    fireEvent.keyDown(getByText(children), { key: 'Alt', keyCode: 18 })
    expect(getByText('Dashboard')).toBeInTheDocument()
    // Should not toggle navigation when using a different key
    fireEvent.keyDown(getByText(children), { key: 'ArrowUp', keyCode: 38 })
    expect(getByText('Dashboard')).toBeInTheDocument()
  })

  test('toggle navigation when using two finger gesture)', (): void => {
    const { getByText } = renderWithAppRoot(
      <InAppLyout {...propsFixture}>{children}</InAppLyout>
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
})
