// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup, mockWindow } from 'testUtils'
// components
import Piechart from './Piechart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Piechart should', (): void => {
  mockWindow()
  afterEach(cleanup)

  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(<Piechart {...chartFixture} />)
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-pie').length).toBe(1)
  })

  test('show message, there is no data to display', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <Piechart labels={undefined} datasets={undefined} />
    )
    // Wait for chart library to finish render
    await wait()
    expect(getByText('Bisher kein Ergebnis')).toBeInTheDocument()
  })
})
