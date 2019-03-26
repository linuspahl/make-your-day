// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationEdit from './EvaluationEdit'

describe('EvaluationEdit should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<EvaluationEdit />)
  })
})
