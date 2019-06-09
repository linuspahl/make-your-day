// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Piechart from './Piechart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Piechart should', (): void => {
  test('render without crashing', (): void => {
    const { container } = renderWithAppRoot(<Piechart {...chartFixture} />)
    expect(container.getElementsByClassName('ct-chart').length).toBe(1)
  })
})
