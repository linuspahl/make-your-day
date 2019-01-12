// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import NotificationBanner from './NotificationBanner'

describe('NotificationBanner should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<NotificationBanner />)
  })
})
