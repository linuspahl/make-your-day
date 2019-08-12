// libraries
import React from 'react'
// components
import EvaluationOverview from 'components/EvaluationOverview/EvaluationOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import {
  evaluation,
  getEvaluationsForListSuccess,
} from 'store/evaluation/fixtures'

describe('EvaluationOverview should', (): void => {
  test('list fetched evaluations', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <EvaluationOverview rootPath="/evaluations" />,
      { mocks: [getEvaluationsForListSuccess] }
    )
    // Wait for the Query component
    await wait()
    expect(getByText(evaluation.title)).toBeInTheDocument()
  })
})
