// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetForm from './WidgetForm'

describe('WidgetForm should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <WidgetForm rootPath="/" submitAction={() => {}} />
    )
  })
})
