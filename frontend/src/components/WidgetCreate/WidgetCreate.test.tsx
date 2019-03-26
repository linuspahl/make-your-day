// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetCreate from './WidgetCreate'

describe('WidgetCreate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<WidgetCreate rootPath="/" createNotificationBanner={() => {}} />)
  })
})
