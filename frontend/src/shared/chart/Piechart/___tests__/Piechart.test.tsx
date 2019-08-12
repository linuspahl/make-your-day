// libraries
import React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup, mockWindow } from 'testUtils'
// components
import Piechart from 'shared/chart/Piechart/Piechart'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('Piechart should', (): void => {
  mockWindow()
  afterEach(cleanup)

  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <Piechart
        series={evaluation.result.series}
        description={<div />}
        chartLegend={<div />}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-pie').length).toBe(1)
  })

  test('show message, there is no data to display', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <Piechart
        description={<div />}
        chartLegend={<div />}
        series={undefined}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(getByText('Bisher kein Ergebnis')).toBeInTheDocument()
  })
})
