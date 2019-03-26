// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordCreate from './RecordCreate'

describe('RecordCreate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<RecordCreate createNotificationBanner={() => {}}>Page content</RecordCreate>) 
  })
})
