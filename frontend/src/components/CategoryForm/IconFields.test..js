// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconFields from './IconFields'

describe('IconFields should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<IconFields />)
  })
})
