// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import EvaluationResult from './EvaluationResult'
// fixtures
import { getEvaluationSuccess, evaluation } from 'store/evaluation/fixtures'

describe('EvaluationResult should', (): void => {
  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationResult rootPath={`/evaluations/${evaluation.id}`} />,
      {
        mocks: [getEvaluationSuccess],
      }
    )
    await wait()
    // TODO: FIX MOCK
    expect(container.getElementsByClassName('ct-chart-line')).toHaveLength(1)
  })
})
