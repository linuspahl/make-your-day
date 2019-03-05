// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationForm from './EvaluationForm'

describe('EvaluationForm should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationForm />)
  })
})
