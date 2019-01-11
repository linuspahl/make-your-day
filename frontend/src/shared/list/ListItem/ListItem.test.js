// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ListItem from './ListItem'

describe('ListItem should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ListItem />)
  })
})
