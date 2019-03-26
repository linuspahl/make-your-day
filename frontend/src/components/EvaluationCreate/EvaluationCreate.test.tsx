// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationCreate from './EvaluationCreate'

describe('EvaluationCreate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<EvaluationCreate rootPath="/" createNotificationBanner={() => {}} />)
  })
})
