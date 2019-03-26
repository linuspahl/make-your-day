// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Piechart from './Piechart'
// fixtures
import {chart as chartFixture} from 'store/evaluation/fixtures'

describe('Piechart should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Piechart {...chartFixture}/>)
  })
})
