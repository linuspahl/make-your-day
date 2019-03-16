// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationOverview from './EvaluationOverview'

describe('EvaluationOverview should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationOverview />)
  })
})
