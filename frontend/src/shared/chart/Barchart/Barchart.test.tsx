// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Barchart from './Barchart'
// fixtures
import {chart as chartFixture} from 'store/evaluation/fixtures'

describe('Barchart should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Barchart {...chartFixture}/>)
  })
})
