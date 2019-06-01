// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationResult from './EvaluationResult'

describe('EvaluationResult should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <EvaluationResult
        rootPath="/"
        createNotificationBanner={(): void => {}}
      />
    )
  })
})
