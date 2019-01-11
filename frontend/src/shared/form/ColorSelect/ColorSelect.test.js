// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ColorSelect from './ColorSelect'

describe('ColorSelect should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ColorSelect />)
  })
})
