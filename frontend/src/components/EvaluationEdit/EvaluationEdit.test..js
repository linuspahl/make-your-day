// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationEdit from './EvaluationEdit'

describe('EvaluationEdit should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluationEdit />)
  })
})
