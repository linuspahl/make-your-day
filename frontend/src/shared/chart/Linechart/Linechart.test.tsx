// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Linechart from './Linechart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Linechart should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Linechart {...chartFixture} />)
  })
})
