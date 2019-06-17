// libraries
import * as React from 'react'
// components
import EvaluationOverview from './EvaluationOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import { evaluation, getEvaluationsSuccess } from 'store/evaluation/fixtures'

describe('EvaluationOverview should', (): void => {
  test('list fetched evaluations', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <EvaluationOverview rootPath="/evaluations" />,
      { mocks: [getEvaluationsSuccess] }
    )
    // Wait for the Query component
    await wait()
    expect(getByText(evaluation.title)).toBeInTheDocument()
  })
})
