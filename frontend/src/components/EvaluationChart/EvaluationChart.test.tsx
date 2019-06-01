// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationChart from './EvaluationChart'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('EvaluationChart should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <EvaluationChart evaluation={evaluation} />
    )
  })
})
