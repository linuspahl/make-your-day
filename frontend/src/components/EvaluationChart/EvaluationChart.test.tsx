// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup, wait, mockWindow } from 'testUtils'
// components
import EvaluationChart from './EvaluationChart'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('EvaluationChart should', (): void => {
  mockWindow()
  afterEach(cleanup)

  test('render Barchart', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationChart evaluation={{ ...evaluation, type: 'barchart' }} />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-bar')).toHaveLength(1)
  })

  test('render Linechart', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationChart evaluation={{ ...evaluation, type: 'linechart' }} />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line')).toHaveLength(1)
  })

  test('render Piechart', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationChart evaluation={{ ...evaluation, type: 'piechart' }} />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-pie')).toHaveLength(1)
  })

  test('not crash when evaluation has no matching type', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(
      <EvaluationChart evaluation={{ ...evaluation, type: null }} />
    )
    expect(getByText('Austerungstyp ist nicht definiert')).toBeInTheDocument()
  })
})
