// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationChart from './EvaluationChart'

describe('EvaluationChart should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationChart />)
  })
})
