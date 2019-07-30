// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Widgets from 'containers/Widgets/Widgets'
// fixtures
import { widget } from 'store/widget/fixtures'
import { userSession } from 'store/userSession/fixtures'

describe('Widgets should', (): void => {
  const propsFixture = {
    createNotificationBanner: (): void => {},
    rootPath: '/widgets',
    userSession,
  }
  afterEach(cleanup)

  test('render widget overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(<Widgets {...propsFixture} />, {
      route: '/widgets',
    })
    expect(getByTestId('WidgetOverview')).toBeInTheDocument()
  })

  test('render widget overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(<Widgets {...propsFixture} />, {
      route: '/widgets/create',
    })
    expect(getByTestId('WidgetCreate')).toBeInTheDocument()
  })

  test('render widget overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(<Widgets {...propsFixture} />, {
      route: `/widgets/edit/${widget.id}`,
    })
    expect(getByTestId('WidgetEdit')).toBeInTheDocument()
  })
})
