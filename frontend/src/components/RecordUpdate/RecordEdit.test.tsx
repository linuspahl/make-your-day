// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordUpdate from './RecordEdit'

describe('RecordUpdate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<RecordUpdate createNotificationBanner={() => {}}>Page content</RecordUpdate>)
  })
})
