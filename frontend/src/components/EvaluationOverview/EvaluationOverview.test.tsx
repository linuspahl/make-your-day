// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationOverview from './EvaluationOverview'

describe('EvaluationOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<EvaluationOverview rootPath="/" />)
  })
})
