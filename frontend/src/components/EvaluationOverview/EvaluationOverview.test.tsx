// libraries
import * as React from 'react'
// components
import EvaluationOverview from './EvaluationOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import {
  evaluation,
  getEvaluationsError,
  getEvaluationsSuccess,
} from 'store/evaluation/fixtures'

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

  test('show info, when evaluation fetching fails', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <EvaluationOverview rootPath="/evaluations" />,
      { mocks: [getEvaluationsError] }
    )
    // Wait for the Query component
    await wait()

    expect(
      getByText('Auswertungen konnten nicht geladen werden')
    ).toBeInTheDocument()
  })

  test('show loading spinner, while fetching evaluations', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <EvaluationOverview rootPath="/evaluations" />
    )
    // without `await wait()` the Query component will be in the loading state
    expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
  })

  test('show info, when there are no existing evaluations', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(
      <EvaluationOverview rootPath="/evaluations" />,
      {
        mocks: [
          {
            ...getEvaluationsSuccess,
            result: { data: { getEvaluations: [] } },
          },
        ],
      }
    )
    await wait()

    expect(getByText('Kein Eintrag vorhanden')).toBeInTheDocument()
  })
})
