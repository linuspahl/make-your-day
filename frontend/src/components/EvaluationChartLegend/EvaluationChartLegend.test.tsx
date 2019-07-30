// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, mockWindow } from 'testUtils'
// components
import EvaluationChartLegend from './EvaluationChartLegend'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('EvaluationChartLegend should', (): void => {
  mockWindow()

  test('list used categories', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <EvaluationChartLegend
        evaluation={{
          ...evaluation,
          result: {
            ...evaluation.result,
            series: [
              {
                data: [{ value: 10 }],
                title: 'Ausgaben',
              },
            ],
          },
        }}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(getByText('Ausgaben')).toBeInTheDocument()
  })
})
