// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Barchart from './Barchart'
// fixtures
import { chart as chartFixture } from 'store/evaluation/fixtures'

describe('Barchart should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Barchart {...chartFixture} />)
  })
})
