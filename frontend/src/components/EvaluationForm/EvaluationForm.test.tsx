// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationForm from './EvaluationForm'

describe('EvaluationForm should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<EvaluationForm rootPath="/" categories={[]} submitAction={() => {}} />)
  })
})
