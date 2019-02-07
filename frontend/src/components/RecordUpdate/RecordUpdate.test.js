// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordCreate from './RecordCreate'

describe('RecordCreate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<RecordCreate>Page content</RecordCreate>)
  })
})
