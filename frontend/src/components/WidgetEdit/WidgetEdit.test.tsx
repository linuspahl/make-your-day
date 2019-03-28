// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetEdit from './WidgetEdit'

describe('WidgetEdit should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <WidgetEdit rootPath="/" createNotificationBanner={() => {}} />
    )
  })
})
