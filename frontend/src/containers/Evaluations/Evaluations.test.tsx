// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Evaluations from './Evaluations'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'
import { userSession } from 'store/userSession/fixtures'

describe('Evaluations should', (): void => {
  const propsFixture = {
    createNotificationBanner: (): void => {},
    rootPath: '/evaluations',
    userSession: userSession,
  }
  afterEach(cleanup)

  test('render evaluation overview route', (): void => {
    const { getByText } = renderWithAppRoot(<Evaluations {...propsFixture} />, {
      route: '/evaluations',
    })
    expect(getByText('Auswertungen verwalten')).toBeInTheDocument()
  })

  test('render evaluation create route', (): void => {
    const { getByText } = renderWithAppRoot(<Evaluations {...propsFixture} />, {
      route: '/evaluations/create',
    })
    expect(getByText('Auswertung erstellen')).toBeInTheDocument()
  })

  test('render evaluation edit route', (): void => {
    const { getByText } = renderWithAppRoot(<Evaluations {...propsFixture} />, {
      route: `/evaluations/edit/${evaluation.id}`,
    })
    expect(getByText('Auswertung bearbeiten')).toBeInTheDocument()
  })

  test('render evaluation view route', (): void => {
    const { getByText } = renderWithAppRoot(<Evaluations {...propsFixture} />, {
      route: `/evaluations/view/${evaluation.id}`,
    })
    expect(getByText('Ergebnis Auswertung')).toBeInTheDocument()
  })
})
