// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Widgets from './Widgets'
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
    const { getByText } = renderWithAppRoot(<Widgets {...propsFixture} />, {
      route: '/widgets',
    })
    expect(getByText('Widgets verwalten')).toBeInTheDocument()
  })

  test('render widget overview route', (): void => {
    const { getByText } = renderWithAppRoot(<Widgets {...propsFixture} />, {
      route: '/widgets/create',
    })
    expect(getByText('Widget erstellen')).toBeInTheDocument()
  })

  test('render widget overview route', (): void => {
    const { getByText } = renderWithAppRoot(<Widgets {...propsFixture} />, {
      route: `/widgets/edit/${widget.id}`,
    })
    expect(getByText('Widget bearbeiten')).toBeInTheDocument()
  })
})
