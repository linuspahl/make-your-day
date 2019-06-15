// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup, wait } from 'testUtils'
// components
import EvaluationChart from './EvaluationChart'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('EvaluationChart should', (): void => {
  window.matchMedia = jest.fn().mockImplementation(
    (query: string): object => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }
    }
  )
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

  test('not crash when evaluation has no result', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <EvaluationChart
        evaluation={{
          ...evaluation,
          result: { labels: undefined, datasets: undefined },
        }}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line')).toHaveLength(1)
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
