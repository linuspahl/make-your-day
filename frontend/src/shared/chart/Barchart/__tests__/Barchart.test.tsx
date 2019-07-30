// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup, mockWindow } from 'testUtils'
// components
import Barchart from 'shared/chart/Barchart/Barchart'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('Barchart should', (): void => {
  mockWindow()
  afterEach(cleanup)

  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <Barchart
        series={evaluation.result.series}
        description={<div />}
        chartLegend={<div />}
        xAxisLabels={['']}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-bar').length).toBe(1)
  })

  test('show message, there is no data to display', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <Barchart
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
