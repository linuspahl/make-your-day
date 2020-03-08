// libraries
import React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Evaluations from 'containers/Evaluations/Evaluations'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('Evaluations should', (): void => {
  const propsFixture = {
    rootPath: '/evaluations',
  }
  afterEach(cleanup)

  test('render evaluation overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Evaluations {...propsFixture} />,
      {
        route: '/evaluations',
      }
    )
    expect(getByTestId('EvaluationOverview')).toBeInTheDocument()
  })

  test('render evaluation create route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Evaluations {...propsFixture} />,
      {
        route: '/evaluations/create',
      }
    )
    expect(getByTestId('EvaluationCreate')).toBeInTheDocument()
  })

  test('render evaluation edit route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Evaluations {...propsFixture} />,
      {
        route: `/evaluations/edit/${evaluation.id}`,
      }
    )
    expect(getByTestId('EvaluationEdit')).toBeInTheDocument()
  })

  test('render evaluation view route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Evaluations {...propsFixture} />,
      {
        route: `/evaluations/view/${evaluation.id}`,
      }
    )
    expect(getByTestId('EvaluationResult')).toBeInTheDocument()
  })
})
