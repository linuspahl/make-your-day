// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Barchart from './Barchart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Barchart should', (): void => {
  test('render without crashing', (): void => {
    const { container } = renderWithAppRoot(<Barchart {...chartFixture} />)
    expect(container.getElementsByClassName('ct-chart').length).toBe(1)
  })
})
