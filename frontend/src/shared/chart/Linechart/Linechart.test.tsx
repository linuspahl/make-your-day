// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Linechart from './Linechart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Linechart should', (): void => {
  test('render without crashing', (): void => {
    const { container } = renderWithAppRoot(<Linechart {...chartFixture} />)
    expect(container.getElementsByClassName('ct-chart').length).toBe(1)
  })
})
