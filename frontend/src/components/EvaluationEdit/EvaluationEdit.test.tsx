// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluationEdit from './EvaluationEdit'

describe('EvaluationEdit should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <EvaluationEdit createNotificationBanner={(): void => {}} rootPath="/" />
    )
  })
})
