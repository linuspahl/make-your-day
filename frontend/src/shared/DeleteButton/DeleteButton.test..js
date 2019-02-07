// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import DeleteButton from './DeleteButton'

describe('DeleteButton should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<DeleteButton />)
  })
})
