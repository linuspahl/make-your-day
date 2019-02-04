// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordFields from './RecordFields'

describe('RecordFields should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<RecordFields />)
  })
})
