// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationResult from './EvaluationResult'

describe('EvaluationResult should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<EvaluationResult rootPath="/" createNotificationBanner={() => {}} />)
  })
})
