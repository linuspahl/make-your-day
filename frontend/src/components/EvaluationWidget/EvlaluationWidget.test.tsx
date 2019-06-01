// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationWidget from './EvaluationWidget'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

describe('EvaluationWidget should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <EvaluationWidget evaluation={evaluation} />
    )
  })
})
