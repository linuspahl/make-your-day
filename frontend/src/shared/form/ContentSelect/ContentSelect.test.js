// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ContentSelect from './ContentSelect'

describe('ContentSelect should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ContentSelect options={[]} />)
  })
})
