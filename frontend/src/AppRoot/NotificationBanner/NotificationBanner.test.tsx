// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import NotificationBanner from './NotificationBanner'

describe('NotificationBanner should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<NotificationBanner />)
  })
})
