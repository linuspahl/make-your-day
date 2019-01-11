// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconSelect from './IconSelect'

describe('IconSelect should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<IconSelect />)
  })
})
