// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetOverview from './WidgetOverview'
// fixtures

describe('WidgetOverview should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<WidgetOverview rootPath="/" />)
  })
})
