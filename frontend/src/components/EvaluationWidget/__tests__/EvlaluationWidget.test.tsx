// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, mockWindow } from 'testUtils'
// components
import EvaluationWidget from 'components/EvaluationWidget/EvaluationWidget'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('EvaluationWidget should', (): void => {
  mockWindow()

  test('render evaluation', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationWidget evaluation={{ ...evaluation, type: 'linechart' }} />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line')).toHaveLength(1)
  })
})
