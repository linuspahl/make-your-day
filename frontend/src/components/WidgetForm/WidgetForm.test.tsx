// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetForm from './WidgetForm'

describe('WidgetForm should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <WidgetForm rootPath="/" submitAction={(): void => {}} />
    )
  })
})
