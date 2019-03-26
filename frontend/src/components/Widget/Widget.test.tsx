// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Widget from './Widget'
// fixtures
import { widget } from 'store/widget/fixtures'

describe('Widget should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Widget widget={widget} createNotificationBanner={() => {}} />)
  })
})
