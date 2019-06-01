// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationCreate from './EvaluationCreate'

describe('EvaluationCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <EvaluationCreate
        rootPath="/"
        createNotificationBanner={(): void => {}}
      />
    )
  })
})
