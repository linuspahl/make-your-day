// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationOverview from './EvaluationOverview'

describe('EvaluationOverview should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<EvaluationOverview rootPath="/" />)
  })
})
