// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordUpdate from './RecordUpdate'

describe('RecordUpdate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<RecordUpdate>Page content</RecordUpdate>)
  })
})
