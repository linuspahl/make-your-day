// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationResult from './EvaluationResult'

describe('EvaluationResult should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationResult />)
  })
})
