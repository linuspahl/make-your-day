// libraries
import React from 'react'
// utils
import { renderWithAppRoot, wait, mockWindow } from 'testUtils'
// components
import EvaluationResult from './EvaluationResult'
// fixtures
import { getEvaluationSuccess, evaluation } from 'store/evaluation/fixtures'

describe('EvaluationResult should', (): void => {
  mockWindow()

  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationResult rootPath={`/evaluations`} />,
      {
        mocks: [getEvaluationSuccess],
        mockWrappingRoute: true,
        route: `/evaluations/view/${evaluation.id}`,
        routePath: '/evaluations/view/:id',
      }
    )
    // wait for getEvaluation
    await wait()
    // wait for chart to render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line')).toHaveLength(1)
  })
})
