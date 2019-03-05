// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationCreate from './EvaluationCreate'

describe('EvaluationCreate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationCreate />)
  })
})
