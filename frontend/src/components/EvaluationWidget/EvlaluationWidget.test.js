// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationWidget from './EvaluationWidget'

describe('EvaluationWidget should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationWidget evaluation={{}} />)
  })
})
