// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup, mockWindow } from 'testUtils'
// components
import Linechart from 'shared/chart/Linechart/Linechart'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('Linechart should', (): void => {
  mockWindow()
  afterEach(cleanup)

  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <Linechart
        series={evaluation.result.series}
        description={<div />}
        chartLegend={<div />}
        xAxisLabels={['']}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line').length).toBe(1)
  })

  test('show message, there is no data to display', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <Linechart
        series={undefined}
        description={<div />}
        chartLegend={<div />}
        xAxisLabels={['']}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(getByText('Bisher kein Ergebnis')).toBeInTheDocument()
  })
})
