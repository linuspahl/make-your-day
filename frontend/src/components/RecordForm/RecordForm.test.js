// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordForm from './RecordForm'

describe('RecordForm should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<RecordForm category={{}} />)
  })
})
