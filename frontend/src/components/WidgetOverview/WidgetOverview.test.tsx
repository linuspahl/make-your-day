// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetOverview from './WidgetOverview'
// fixtures

describe('WidgetOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<WidgetOverview rootPath="/" />)
  })
})
