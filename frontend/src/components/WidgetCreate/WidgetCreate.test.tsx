// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetCreate from './WidgetCreate'

describe('WidgetCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <WidgetCreate rootPath="/" createNotificationBanner={(): void => {}} />
    )
  })
})
