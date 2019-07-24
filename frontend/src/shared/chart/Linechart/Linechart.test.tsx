// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup, mockWindow } from 'testUtils'
// components
import Linechart from './Linechart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Linechart should', (): void => {
  mockWindow()
  afterEach(cleanup)

  test('render without crashing', async (): Promise<void> => {
    const { container } = renderWithAppRoot(<Linechart {...chartFixture} />)
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line').length).toBe(1)
  })

  test('show message, there is no data to display', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <Linechart labels={undefined} datasets={undefined} />
    )
    // Wait for chart library to finish render
    await wait()
    expect(getByText('Bisher kein Ergebnis')).toBeInTheDocument()
  })
})
